import axiosClient from "./axiosClient";

const postApi = {
  getNewPost: () => axiosClient.get("post/getNewPost"),
};
export default postApi;