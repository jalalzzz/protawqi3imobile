import { ApiClient } from "@services";

const downloadDocSignFileUrl = "DocSignApi/DownloadDocSignFile";
const fetchAttachmentNotesUrl = "DocSignNoteApi/GetNotes";

const types = {
  CLEAR_DOWNLOAD_DOCSIGN_PENDING: "CLEAR_DOWNLOAD_DOCSIGN_PENDING",

  DOWNLOAD_DOCSIGN_PENDING: "DOWNLOAD_DOCSIGN_PENDING",
  DOWNLOAD_DOCSIGN_SUCCESS: "DOWNLOAD_DOCSIGN_SUCCESS",
  DOWNLOAD_DOCSIGN_FAILURE: "DOWNLOAD_DOCSIGN_FAILURE",

  FETCH_ATTACHMENT_NOTES_PENDING: "FETCH_ATTACHMENT_NOTES_PENDING",
  FETCH_ATTACHMENT_NOTES_SUCCESS: "FETCH_ATTACHMENT_NOTES_SUCCESS",
  FETCH_ATTACHMENT_NOTES_FAILURE: "FETCH_ATTACHMENT_NOTES_FAILURE",

  CLEAR_ATTACHMENT_NOTES: "CLEAR_ATTACHMENT_NOTES",
};

export const actions = {
  clearAttachmentNotes: async (dispatch) => {
    dispatch({
      type: types.CLEAR_ATTACHMENT_NOTES,
    });
  },
  clearDownloadDocSign: async (dispatch) => {
    dispatch({
      type: types.CLEAR_DOWNLOAD_DOCSIGN_PENDING,
    });
  },
  downloadDocSign: async (dispatch, downloadGuid) => {
    dispatch({
      type: types.DOWNLOAD_DOCSIGN_PENDING,
    });
    const data = {
      DocSignGuid: downloadGuid,
    };
    await ApiClient.post(downloadDocSignFileUrl, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.DOWNLOAD_DOCSIGN_SUCCESS,
          fileBytes: "data:application/pdf;base64," + response.data,
        });
      } else {
        dispatch({
          type: types.DOWNLOAD_DOCSIGN_FAILURE,
        });
      }
    });
  },
  getAttachmentNotes: async (dispatch, docSignGuid, attachmentId) => {
    dispatch({
      type: types.FETCH_ATTACHMENT_NOTES_PENDING,
    });
    const data = {
      DocSignGuid: docSignGuid,
      AttachmentId: attachmentId,
    };
    await ApiClient.post(fetchAttachmentNotesUrl, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.FETCH_ATTACHMENT_NOTES_SUCCESS,
          attachmentNotes: response.data,
        });
      } else {
        dispatch({
          type: types.FETCH_ATTACHMENT_NOTES_FAILURE,
        });
      }
    });
  },
};

const initialState = {
  fileBytesData: null,
  attachmentNoteData: null,
  isLoading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  const { type, error, fileBytes, attachmentNotes } = action;
  switch (type) {
    case types.CLEAR_ATTACHMENT_NOTES: {
      return {
        ...state,
        attachmentNoteData: null,
        error: null,
      };
    }
    case types.CLEAR_DOWNLOAD_DOCSIGN_PENDING: {
      return {
        ...state,
        fileBytesData: null,
        isLoading: false,
        error: null,
      };
    }
    case types.DOWNLOAD_DOCSIGN_PENDING: {
      return {
        ...state,
        fileBytesData: null,
        isLoading: true,
        error: null,
      };
    }
    case types.DOWNLOAD_DOCSIGN_SUCCESS: {
      return {
        ...state,
        fileBytesData: fileBytes,
        isLoading: false,
        error: null,
      };
    }
    case types.DOWNLOAD_DOCSIGN_FAILURE: {
      return {
        ...state,
        fileBytesData: null,
        isLoading: false,
        error,
      };
    }
    case types.FETCH_ATTACHMENT_NOTES_PENDING: {
      return {
        ...state,
        attachmentNoteData: null,
        isLoading: true,
        error: null,
      };
    }
    case types.FETCH_ATTACHMENT_NOTES_SUCCESS: {
      return {
        ...state,
        attachmentNoteData: attachmentNotes,
        isLoading: false,
        error: null,
      };
    }
    case types.FETCH_ATTACHMENT_NOTES_FAILURE: {
      return {
        ...state,
        attachmentNoteData: null,
        isLoading: false,
        error,
      };
    }
  }
  return state;
};
