import axios from "axios";
import config from "../global/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import signOut from "./signOut";

export const baseURL = config.API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: (await AsyncStorage.getItem("access_token"))
      ? await AsyncStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Prevent infinite loops
    if (error.response.data.error === "wrong_token_type") {
      signOut();
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "expired_token_or_algorithm_not_supported"
    ) {
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/v1.0/auth/refresh", null, {
              headers: {
                Authorization: `${refreshToken}`,
              },
            })
            .then(async (response) => {
              //   localStorage.setItem("access_token", response.data.access);
              //   localStorage.setItem("refresh_token", response.data.refresh);

              await AsyncStorage.setItem(
                "access_token",
                response.data.return_data.access
              );

              axiosInstance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          signOut();
        }
      } else {
        console.log("Refresh token not available.");
        signOut();
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
