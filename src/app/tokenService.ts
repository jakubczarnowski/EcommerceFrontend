function getAccessToken() {
	const userData = localStorage.getItem("user");
	if (typeof userData === "string" && userData != "") {
		const user = JSON.parse(userData);
		if (user && user.accessToken) {
			return "Bearer " + user.accessToken;
		}
	}
	return "";
}
function getRefreshToken() {
	const userData = localStorage.getItem("user");
	if (typeof userData === "string" && userData != "") {
		const user = JSON.parse(userData);
		if (user && user.accessToken) {
			return user.accessToken;
		}
	}
	return "";
}
const updateAccessToken = (token: string) => {
	let user = JSON.parse(localStorage.getItem("user") || "{}");
	user.accessToken = token;
	localStorage.setItem("user", JSON.stringify(user));
};
const TokenService = {
	getAccessToken,
	getRefreshToken,
	updateAccessToken,
};
export default TokenService;
