import axios from "axios";
import {
   SMAI_APP_API_URL
} from "../constants/api";

import * as SecureStore from "expo-secure-store";
const axiosClient = axios.create({
  baseURL: SMAI_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken =await SecureStore.getItemAsync("token");
    if (accessToken) {
      config.headers.Authorization = "bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
    (response) => {
        if(response){
            return response
        }
    },
    (error) => {
        return error
    }
);

export default axiosClient;

