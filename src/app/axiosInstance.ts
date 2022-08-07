import axios from "axios";
import { BASE_URL } from "../utils/BaseUrl";
import authHeader from "./authHeader";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: authHeader(),
		"Content-Type": "application/json",
	},
	validateStatus: (status) => status >= 200 && status <= 302,
});

axiosInstance.interceptors.request.use(
	(config: any) => {
		const token = authHeader();
		if (token) {
			config.headers.Authorization = token;
		} else {
			delete axiosInstance.defaults.headers.common.Authorization;
		}
		return config;
	},

	(error) => Promise.reject(error)
);

export default axiosInstance;
