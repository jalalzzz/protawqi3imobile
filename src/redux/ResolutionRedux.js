import { ApiClient } from "@services";
import { ResolutionModel } from "@models";

const resolutionPdfUrl = "ResolutionsApi/GetAllResolutions";
const resolutionTypesUrl = "ResolutionTypesApi/list?withDefaultValue=true";

const types = {
  RESOLUTION_PDF_PENDING: "RESOLUTION_PDF_PENDING",
  RESOLUTION_PDF_SUCCESS: "RESOLUTION_PDF_SUCCESS",
  RESOLUTION_PDF_FAILURE: "RESOLUTION_PDF_FAILURE",
  RESOLUTION_TYPES_PENDING: "RESOLUTION_TYPES_PENDING",
  RESOLUTION_TYPES_SUCCESS: "RESOLUTION_TYPES_SUCCESS",
  RESOLUTION_TYPES_FAILURE: "RESOLUTION_TYPES_FAILURE",
};

export const actions = {
  ResolutionPdf: async (dispatch, nameItem, offset, status, typeId) => {
    dispatch({
      type: types.RESOLUTION_PDF_PENDING,
    });
    const data = {
      Name: nameItem,
      Start: offset,
      Length: 10,
      DocSignStatusId: status,
      ResolutionTypeId: typeId,
    };
    await ApiClient.post(resolutionPdfUrl, data).then((response) => {
      var data = prepareResolutionData(response.data.Data);
      console.log(data, "data");
      if (response.ok) {
        dispatch({
          type: types.RESOLUTION_PDF_SUCCESS,
          dataResolution: data,
          totalResolutions: response?.data?.recordsTotal,
          offset,
        });
      } else {
        dispatch({
          type: types.RESOLUTION_PDF_FAILURE,
        });
      }
    });
  },
  ResolutionTypes: async (dispatch) => {
    console.log("entered");
    dispatch({ type: types.RESOLUTION_TYPES_PENDING });
    await ApiClient.get(resolutionTypesUrl)
      .then((response) => {
        console.log(response, "resssss");
        dispatch({
          type: types.RESOLUTION_TYPES_SUCCESS,
          resolutionTypes: response?.data,
        });
      })
      .catch((error) => {
        console.log(error, "erorr");
        dispatch({ types: types.RESOLUTION_TYPES_FAILURE });
      });
  },
};

const initialState = {
  resolution: [],
  isLoading: false,
  isView: false,
  error: null,
  resolutionTypes: [],
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    dataResolution,
    totalResolutions,
    offset,
    resolutionTypes,
  } = action;

  switch (type) {
    case types.RESOLUTION_PDF_PENDING: {
      return {
        ...state,
        isLoading: true,
        isView: true,
        error: null,
      };
    }
    case types.RESOLUTION_PDF_SUCCESS: {
      return {
        ...state,
        resolution:
          offset === 0
            ? [...dataResolution]
            : [...state.resolution, ...dataResolution],
        isLoading: false,
        isView: false,
        error: null,
        totalResolutions,
      };
    }
    case types.RESOLUTION_PDF_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isView: false,
        error,
      };
    }
    case types.RESOLUTION_TYPES_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.RESOLUTION_TYPES_SUCCESS: {
      return {
        ...state,
        resolutionTypes,
      };
    }
    case types.RESOLUTION_TYPES_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }
  }
  return state;
};
const prepareResolutiontItem = (item) => {
  console.log(item, "item action");
  var model = new ResolutionModel(
    item.Name,
    item.Number,
    item.DocSignStatusText,
    item.DocSignStatusId,
    item.MainAttachmentUrl,
    item.DocSignGuid,
    item.DownloadGuid,
    item.CreatedOnStr,
    item.LastViewedDate,
    item.Invitees,
    item.ResolutionType
  );
  return model;
};

const prepareResolutionData = (data) => {
  console.log(data, "dataaaa ");
  let list = [];
  if (data && data.length > 0) {
    data.map((item) => {
      var model = prepareResolutiontItem(item);
      console.log(model, "model");
      list.push(model);
    });
  }
  console.log(list, "list");
  return list;
};
