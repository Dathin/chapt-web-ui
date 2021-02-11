import axios from '../service/ChaptAxios';
import { UserLoginResponse } from '../domain/response/UserLoginResponse';

export class PrivateController {

	constructor() {
		const token = localStorage.getItem('token');
		this.manageToken(token);
	}

	private manageToken = async (token: string | null) => {
		if (!token) {
			this.redirectToLoginPage();
		} else {
			await this.scheduleRefreshToken(token);
		}
	};

	private redirectToLoginPage = () => {
		location.pathname = '/login.html';
	};

	private scheduleRefreshToken = async (token: string): Promise<void> => {
		const payload = JSON.parse(atob(token.split('.')[1]));
		const validPeriod = payload.exp - payload.iat;
		const periodInMsWithFat = validPeriod * 900;
		setInterval(this.refreshToken, periodInMsWithFat);
	};
	//
	private refreshToken = async () => {
		const userLoginResponse = await axios.post<UserLoginResponse>(
			'http://localhost:8080/user/refresh',
		);
		localStorage.setItem('token', userLoginResponse.data.token);
	};
}
