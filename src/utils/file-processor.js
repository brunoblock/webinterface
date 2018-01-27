import _ from "lodash";
import axios from "axios";
import Encryption from "utils/encryption";
import { API, FILE } from "config";

const {
  parseEightCharsOfFilename,
  getSalt,
  getPrimordialHash,
  sha256,
  encrypt
} = Encryption;

const chunkGenerator = ({ idx, data, hash }) => {
  return { idx, data, hash };
};

const uploadFileToBrokerNodes = (file, handle) => {
  const byteChunks = createByteChunks(file);
  const genesisHash = sha256(handle);

  return createUploadSession(file.size, genesisHash)
    .then(sessionId =>
      Promise.all([
        sendToAlphaBroker(sessionId, byteChunks, file, handle, genesisHash)
        // sendToBetaBroker(sessionId, byteChunks, file, handle, genesisHash)
      ])
    )
    .then(() => {
      return { numberOfChunks: byteChunks.length, handle, fileName: file.name };
    });
};

const createHandle = fileName => {
  const fileNameTrimmed = parseEightCharsOfFilename(fileName);
  const salt = getSalt(8);
  const primordialHash = getPrimordialHash();
  const handle = fileNameTrimmed + primordialHash + salt;

  return handle;
};

const createByteChunks = file => {
  // This returns an array with the starting byte pointers
  // ex: For a 150 byte file it would return: [0, 1001, 2002, 3003, 4004]
  const byteLocations = _.range(0, file.size, FILE.CHUNK_BYTE_SIZE + 1);
  const byteChunks = _.map(byteLocations, (byte, index) => {
    return { chunkIdx: index + 1, chunkStartingPoint: byte };
  });

  return byteChunks;
};

const createUploadSession = (fileSizeBytes, genesisHash) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${API.HOST}${API.V1_UPLOAD_SESSIONS_PATH}`, {
        file_size_bytes: fileSizeBytes,
        genesis_hash: genesisHash
      })
      .then(({ data }) => {
        console.log("UPLOAD SESSION SUCCESS: ", data);
        const { id: sessionId } = data;
        resolve(sessionId);
      })
      .catch(error => {
        console.log("UPLOAD SESSION ERROR: ", error);
        reject(error);
      });
  });

const createReader = onRead => {
  const reader = new FileReader();
  reader.onloadend = function(evt) {
    if (evt.target.readyState === FileReader.DONE) {
      onRead(evt.target.result);
    }
  };
  return reader;
};

const sendChunkToBroker = (sessionId, chunkIdx, data, handle, genesisHash) =>
  new Promise((resolve, reject) => {
    const encryptedData = encrypt(data, handle);
    axios
      .put(`${API.HOST}${API.V1_UPLOAD_SESSIONS_PATH}/${sessionId}`, {
        chunk: chunkGenerator({
          idx: chunkIdx,
          data: encryptedData,
          hash: genesisHash
        })
      })
      .then(response => {
        console.log("SENT CHUNK TO BROKER: ", response);
        resolve(response);
      })
      .catch(error => {
        console.log("ERROR SENDING CHUNK TO BROKER:", error);
        reject();
      });
  });

const sendFileContentsToBroker = (
  sessionId,
  file,
  handle,
  genesisHash,
  byteChunks,
  sliceCutOffFn
) => {
  const chunkRequests = byteChunks.map(
    byte =>
      new Promise((resolve, reject) => {
        const { chunkIdx, chunkStartingPoint } = byte;
        const blob = file.slice(
          chunkStartingPoint,
          sliceCutOffFn(chunkStartingPoint)
        );

        const reader = createReader(fileSlice => {
          sendChunkToBroker(
            sessionId,
            chunkIdx,
            fileSlice,
            handle,
            genesisHash
          ).then(resolve);
        });
        reader.readAsBinaryString(blob);
      })
  );

  return Promise.all(chunkRequests);
};

const sendMetaDataToBroker = (sessionId, file, handle, genesisHash) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${API.HOST}${API.V1_UPLOAD_SESSIONS_PATH}/${sessionId}`, {
        chunk: chunkGenerator({
          idx: 0,
          data: buildMetaDataPacket(file, handle),
          hash: genesisHash
        })
      })
      .then(({ data }) => {
        console.log("METADATA TO BROKER SUCCESS: ", data);
        resolve(data);
      })
      .catch(error => {
        console.log("METADATA TO BROKER ERROR: ", error);
        reject(error);
      });
  });

const sendToAlphaBroker = (sessionId, byteChunks, file, handle, genesisHash) =>
  new Promise((resolve, reject) => {
    sendMetaDataToBroker(sessionId, file, handle, genesisHash)
      .then(() =>
        sendFileContentsToBroker(
          sessionId,
          file,
          handle,
          genesisHash,
          byteChunks,
          byteLocation => byteLocation + FILE.CHUNK_BYTE_SIZE
        )
      )
      .then(resolve);
  });

const sendToBetaBroker = (sessionId, byteChunks, file, handle, genesisHash) =>
  new Promise((resolve, reject) => {
    sendFileContentsToBroker(
      sessionId,
      file,
      handle,
      genesisHash,
      [...byteChunks].reverse(),
      byteLocation => Math.min(file.size, byteLocation + FILE.CHUNK_BYTE_SIZE)
    )
      .then(() => sendMetaDataToBroker(sessionId, file, handle, genesisHash))
      .then(resolve);
  });

const buildMetaDataPacket = (file, handle) => {
  const fileExtension = file.name.split(".").pop();
  const metaData = assembleMetaData(file.name, fileExtension);
  const encryptedMetaData = encrypt(metaData, handle);

  return encryptedMetaData;
};

const assembleMetaData = (name, extension) => {
  const shortenedName = name.substr(0, 500);
  const metaData = { filename: shortenedName, ext: extension };
  return JSON.stringify(metaData);
};

export default {
  uploadFileToBrokerNodes,
  sendChunkToBroker,
  createHandle,
  createByteChunks,
  createUploadSession,
  buildMetaDataPacket
};
