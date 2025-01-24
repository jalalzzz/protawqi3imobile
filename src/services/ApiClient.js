import { create } from "apisauce";
import { Config } from "@common";
import AuthTokenStorage from "../store/AuthTokenStorage";

const apiClient = create({
  baseURL: Config.BaseUrl.url,
});

apiClient.addAsyncRequestTransform(async (request) => {
  var token = await AuthTokenStorage.getToken();
  request.headers["Authorization"] = "Bearer " + token;
});

export default apiClient;
