export default function authHeader() {
	const userData = localStorage.getItem("user");
	if (typeof userData === "string") {
		const user = JSON.parse(userData);
		if (user && user.accessToken) {
			return "Bearer " + user.accessToken;
		}
	}
	return "";
}
