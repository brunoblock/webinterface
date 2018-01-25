import _ from "lodash";
import iota from "services/iota";
import Encryption from "utils/encryption";

const generate = (size, handle) => {
  const keys = _.range(1, size + 1);
  const handleInTrytes = iota.utils.toTrytes(handle);

  return _.reduce(
    keys,
    (hash, n) => {
      const previousChunkInTrytes = hash[n - 1];
      const previousEncryptedChunk = iota.utils.fromTrytes(
        previousChunkInTrytes
      );

      const encryptedHash = Encryption.encrypt(previousEncryptedChunk);
      const encryptedHashInTrytes = iota.utils.toTrytes(encryptedHash);

      console.log("IOTA ADDRESS: ", encryptedHashInTrytes);

      hash[n] = encryptedHashInTrytes;

      return hash;
    },
    { 0: handleInTrytes }
  );
};

export default { generate };
