import IOTA from "iota.lib.js";
import { IOTA_API } from "config";

const Iota = new IOTA({
  provider: IOTA_API.PROVIDER
});

const checkUploadPercentage = addresses =>
  new Promise((resolve, reject) => {
    Iota.api.findTransactionObjects(
      { addresses },
      (error, transactionObjects) => {
        if (error) {
          console.log("IOTA ERROR: ", error);
        }
        global.blah = transactionObjects;
        console.log("transactionObjects: ", transactionObjects);
        const settledTransactions = transactionObjects || [];
        const percentage = settledTransactions.length / addresses.length * 100;
        resolve(percentage);
      }
    );
  });

export default {
  checkUploadPercentage,
  utils: Iota.utils
};
