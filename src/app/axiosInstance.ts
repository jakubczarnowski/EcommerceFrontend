import axios from "axios";
import { BASE_URL } from "../utils/BaseUrl";
import authHeader from "./authHeader";

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: authHeader(),
		"Content-Type": "application/json",
	},
	validateStatus: (status) => status >= 200 && status <= 302,
});
