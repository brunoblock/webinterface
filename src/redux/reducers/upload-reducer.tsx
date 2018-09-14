import uploadActions from "../actions/upload-actions";
import navigationActions from "../actions/navigation-actions";
import { API } from "../../config";

export const UPLOAD_STATE = Object.freeze({
  UPLOADING: "UPLOADING",
  ATTACHING_META: "ATTACHING_META", // Upload complete, waiting for meta.
  COMPLETE: "COMPLETE" // Attached meta, could be waiting for rest of chunks or completed.
});

const initState = {
  alphaBroker: API.BROKER_NODE_A,
  betaBroker: API.BROKER_NODE_B,
  indexes: { indexes: [], startingLength: 0 },
  dataMapLength: 0,
  history: [], // object returned by uploadedFileGenerator()
  retentionYears: 1,
  invoice: null, // { cost, ethAddress }
  gasPrice: 20,
  uploadProgress: 0,
  handle: "",
  uploadState: UPLOAD_STATE.UPLOADING
};

const uploadReducer = (state = initState, action) => {
  switch (action.type) {
    case navigationActions.VISIT_UPLOAD_FORM:
      return initState; // resets state.

    case uploadActions.SELECT_ALPHA_BROKER:
      return {
        ...state,
        alphaBroker: action.payload
      };

    case uploadActions.SELECT_BETA_BROKER:
      return {
        ...state,
        betaBroker: action.payload
      };

    case uploadActions.SELECT_RETENTION_YEARS:
      return {
        ...state,
        retentionYears: action.payload
      };

    // Streaming actions.

    case uploadActions.INVOICED:
      const { cost, ethAddress } = action.payload;
      return { ...state, invoice: { cost, ethAddress } };

    case uploadActions.PAYMENT_CONFIRMED:
      return { ...state, uploadState: UPLOAD_STATE.ATTACHING_META };

    case uploadActions.CHUNKS_DELIVERED: {
      const { handle } = action.payload;
      return { ...state, handle, uploadState: UPLOAD_STATE.COMPLETE };
    }

    case uploadActions.UPLOAD_PROGRESS:
      const { progress } = action.payload;
      return { ...state, uploadProgress: progress };

    // case uploadActions.UPLOAD:
    // case uploadActions.UPLOAD_ERROR:

    case uploadActions.UPLOAD_SUCCESS: {
      const { handle } = action.payload;
      return { ...state, handle: handle };
    }

    default:
      return state;
  }
};

export default uploadReducer;
