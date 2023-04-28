import axios from "axios";
import { setMessage } from "../reducers/messageSlice";
import { BASE_URL } from "../utils/BaseUrl";
import { store } from "./store";
import TokenService from "./tokenService";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: TokenService.getAccessToken(),
        "Content-Type": "application/json",
    },
    validateStatus: (status) => status >= 200 && status <= 302,
});

axiosInstance.interceptors.request.use(
    (config: any) => {
        const token = TokenService.getAccessToken();
        if (token) {
            config.headers.Authorization = token;
        } else {
            delete axiosInstance.defaults.headers.common.Authorization;
        }
        return config;
    },

    (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
    (res: any) => {
        return res;
    },
    async (err: any) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/signin" && err.response && localStorage.getItem("user") !== null) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await axiosInstance.post(
                        "/auth/refreshtoken",
                        JSON.stringify({
                            refreshToken: TokenService.getRefreshToken(),
                        })
                    );

                    const { accessToken } = rs.data;
                    TokenService.updateAccessToken(accessToken);

                    return axiosInstance(originalConfig);
                } catch (_error) {
                    localStorage.removeItem("user");
                    delete axiosInstance.defaults.headers.common.Authorization;
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);
axiosInstance.interceptors.response.use(
    (res: any) => {
        return res;
    },
    async (err: any) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/signin" && err.response.status === 401) {
            store.dispatch(setMessage({ message: "You have to be logged to do that.", error: true }));
        }

        return Promise.reject(err);
    }
);

export default axiosInstance;
