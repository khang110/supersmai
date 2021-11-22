import axiosClient from "./axiosClient";
const userApi = {
  login: (data) => axiosClient.post("account/login", data),
  getInforuserByToken: () => axiosClient.get("user/getInForUserByTokenId"),
  checkphone: (PhoneNumber) =>
    axiosClient.post("account/getPhone", PhoneNumber),
  register: (data) => axiosClient.post("account/register"),
};
export default userApi;
