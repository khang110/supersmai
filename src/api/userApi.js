import axiosClient from "./axiosClient";
const userApi = {
  login: (data) => axiosClient.post("account/login", data),
  getInforuserByToken: () => axiosClient.get("user/getInForUserByTokenId"),
};
export default userApi;