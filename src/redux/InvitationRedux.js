import { ApiClient } from "@services";
import { Config } from "@common";
import { InvitationsModel } from "@models";

const invitationsPdfUrl = "InvitationsApi/GetAllInvitations";

const types = {
  INVITATIONS_PDF_PENDING: "INVITATIONS_PDF_PENDING",
  INVITATIONS_PDF_SUCCESS: "INVITATIONS_PDF_SUCCESS",
  INVITATIONS_PDF_FAILURE: "INVITATIONS_PDF_FAILURE",
};

export const actions = {
  InvitationPdf: async (dispatch, nameItem, offset) => {
    dispatch({
      type: types.INVITATIONS_PDF_PENDING,
    });
    const data = {
      Name: nameItem,
      Start: offset,
      Length: 10,
    };
    await ApiClient.post(invitationsPdfUrl, data).then((response) => {
      var data = prepareInvitationsData(response.data.Data);
      if (response.ok) {
        dispatch({
          type: types.INVITATIONS_PDF_SUCCESS,
          dataInvitations: data,
          totalInvitations: response?.data?.recordsTotal,
          offset,
        });
      } else {
        dispatch({
          type: types.INVITATIONS_PDF_FAILURE,
        });
      }
    });
  },
};

const initialState = {
  invitations: [],
  isLoading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  const { type, error, dataInvitations, totalInvitations, offset } = action;

  switch (type) {
    case types.INVITATIONS_PDF_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.INVITATIONS_PDF_SUCCESS: {
      return {
        ...state,
        invitations:
          offset === 0
            ? [...dataInvitations]
            : [...state.invitations, ...dataInvitations],
        isLoading: false,
        error: null,
        totalInvitations,
      };
    }
    case types.INVITATIONS_PDF_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
  }
  return state;
};
const prepareInvitationstItem = (item) => {
  var model = new InvitationsModel(
    item.Name,
    item.Number,
    item.MeetingDateStr,
    item.DocSignStatusText,
    item.DocSignStatusId,
    item.MainAttachmentUrl,
    item.DocSignGuid,
    item.DownloadGuid,
    item.IsUserConfirmed,
    item.LastViewedDate
  );
  return model;
};

const prepareInvitationsData = (data) => {
  let list = [];
  if (data && data.length > 0) {
    data.map((item) => {
      var model = prepareInvitationstItem(item);
      list.push(model);
    });
  }

  return list;
};
