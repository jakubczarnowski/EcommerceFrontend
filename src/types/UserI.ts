export default interface UserI {
	id: number;
	username: string;
	email: string;
	roles: string[];
	accessToken: string;
	refreshToken: string;
	tokenType: string;
}
