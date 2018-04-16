import IOTA from "iota.lib.js";
import _ from "lodash";
import { IOTA_API } from "config";

const Iota = new IOTA();

const IotaA = new IOTA({
  provider: IOTA_API.PROVIDER_A
});

const IotaB = new IOTA({
  provider: IOTA_API.PROVIDER_B
});

const IotaC = new IOTA({
  provider: IOTA_API.PROVIDER_C
});

const toAddress = string => string.substr(0, IOTA_API.ADDRESS_LENGTH);

const parseMessage = message => {
  const characters = message.split("");
  const notNineIndex = _.findLastIndex(characters, c => c !== "9");

  const choppedArray = characters.slice(0, notNineIndex + 1);
  const choppedMessage = choppedArray.join("");

  const evenChars =
    choppedMessage.length % 2 === 0 ? choppedMessage : choppedMessage + "9";

  return Iota.utils.fromTrytes(evenChars);
};

const lightTxObjects = (trytes) => {
  return _.map(trytes, (trytes) => {
    if (!trytes) return

    // validity check
    for (var i = 2279; i < 2295; i++) {
      if (trytes.charAt(i) !== "9") return
    }

    return {
      signatureMessageFragment: trytes.slice(0, 2187),
      address: trytes.slice(2187, 2268)
    }
  })
}

const queryTrytes = (iotaProvider, transactions) =>
  new Promise((resolve, reject) => {
    iotaProvider.api.getTrytes(transactions, (error, trytes) => {
      if(error) {
        return reject(error)
      }

      resolve(trytes)
    })
  });

const queryTransactions = (iotaProvider, addresses) =>
  new Promise((resolve, reject) => {
    iotaProvider.api.findTransactions(
      { addresses },
      (error, transactions) => {
        if (error) {
          console.log("IOTA ERROR: ", error);
          return reject(error)
        }

        queryTrytes(iotaProvider, transactions).then((trytes) => {
          const transactionObjects = lightTxObjects(trytes)
          const settledTransactions = transactionObjects || [];
          const uniqTransactions = _.uniqBy(settledTransactions, "address");
          resolve(uniqTransactions);
        }, reject)
      }
    );
  });

const checkUploadPercentage = addresses =>
  new Promise((resolve, reject) => {
    queryTransactions(IotaA, addresses).then(transactions => {
      const percentage = transactions.length / addresses.length * 100;
      resolve(percentage);
    });
  });

const findTransactions = addresses =>
  new Promise((resolve, reject) => {
    Promise.race([
      queryTransactions(IotaA, addresses),
      queryTransactions(IotaB, addresses),
      queryTransactions(IotaC, addresses)
    ]).then(transactions => {
      if (transactions.length === addresses.length) {
        resolve(transactions);
      } else {
        reject(Error("NO TRANSACTION FOUND"));
      }
    });
  });

export default {
  toAddress,
  parseMessage,
  checkUploadPercentage,
  findTransactions,
  utils: Iota.utils
};
