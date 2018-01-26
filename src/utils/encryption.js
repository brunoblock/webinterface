import CryptoJS from "crypto-js";
import uuidv4 from "uuid/v4";

const parseEightCharsOfFilename = fileName => {
  fileName = fileName + "________";
  fileName = fileName.substr(0, 8);

  return fileName;
};

const getSalt = numChars => {
  const salt = Math.random()
    .toString(36)
    .substr(2, numChars);

  return salt;
};

const getPrimordialHash = () => {
  const entropy = uuidv4();
  return CryptoJS.SHA256(entropy).toString();
};

const getNextHash = (previousHash) =>
    CryptoJS.SHA256(previousHash).toString();

const encrypt = (message, secretKey) =>
  CryptoJS.AES.encrypt(message, secretKey).toString();

const decrypt = (ciphertext, secretKey) =>
  CryptoJS.AES.decrypt(ciphertext, secretKey);

export default {
  parseEightCharsOfFilename,
  getSalt,
  getPrimordialHash,
  getNextHash,
  encrypt,
  decrypt
};
