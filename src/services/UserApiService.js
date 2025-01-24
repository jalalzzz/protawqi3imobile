import apiClient from "./ApiClient";
import AuthTokenStorage from "@store/AuthTokenStorage";
const loginUrl = "AuthApi/Login";
const SignupEmailUrl = "AuthApi/SignupEmail";
const SignupUsernameUrl = "AuthApi/SignupUsername";
const UsernameExistUrl = "AuthApi/IsUsernameExist";
const CodeVerifyUrl = "AuthApi/CodeVerify";
const ResendCodeUrl = "AuthApi/ResendCode";
const PasswordRecoverySendUrl = "AuthApi/PasswordRecoverySend";
const ChangePasswordUrl = "AuthApi/ChangePassword";
const UserAPIService = {
  Login: async (username, password) => {
    const data = { Username: username, Password: password };
    var response = await apiClient.post(loginUrl, data);
    return response;
  },
  SignupEmail: async (model) => {
    const data = {
      FirstName: model.firstName,
      LastName: model.lastName,
      Email: model.email,
      UserTypeId: model.userTypeId,
    };
    var response = await apiClient.post(SignupEmailUrl, data);
    return response;
  },
  SignupUsername: async (model) => {
    const data = {
      FirstName: model.firstName,
      LastName: model.lastName,
      Email: model.email,
      UserTypeId: model.userTypeId,
      Username: model.userName,
      Password: model.password,
    };
    var response = await apiClient.post(SignupUsernameUrl, data);
    return response;
  },
  UsernameExist: async (email, username) => {
    const data = { Email: email, Username: username };
    var response = await apiClient.post(UsernameExistUrl, data);
    return response;
  },
  CodeVerify: async (email, code) => {
    const data = { Email: email, Code: code };
    var response = await apiClient.post(CodeVerifyUrl, data);
    return response;
  },
  ResendCode: async (email) => {
    const data = { Email: email };
    var response = await apiClient.post(ResendCodeUrl, data);
    return response;
  },
  PasswordRecoverySend: async (email) => {
    const data = { Email: email };
    var response = await apiClient.post(PasswordRecoverySendUrl, data);
    return response;
  },
  ChangePassword: async (email, password) => {
    const data = { Email: email, Password: password };
    var response = await apiClient.post(ChangePasswordUrl, data);
    return response;
  },
};

export default UserAPIService;
