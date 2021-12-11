import axiosClient from "./axiosClient";
const userApi = {
  login: (data) => axiosClient.post("account/login", data),
  getInforuserByToken: () => axiosClient.get("user/getInForUserByTokenId"),
  checkphone: (PhoneNumber) =>
    axiosClient.post("account/getPhone", PhoneNumber),
  register: (data) => axiosClient.post("account/register", data),
  updateProfileUser: (body) => axiosClient.post("user/profileUser",body),
  newPassword: (body) => axiosClient.post("account/Forgot",body),
  getPhone:(body) => axiosClient.post("account/getPhone",body)

};
export default userApi;
