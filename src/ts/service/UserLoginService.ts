import { AlertService } from './AlertService';
import { UserLoginRequest } from '../domain/request/UserLoginRequest';
import axios from './ChaptAxios';
import { UserLoginResponse } from '../domain/response/UserLoginResponse';
import { INVALID_CREDENTIALS, UNEXPECTED_ERROR } from '../domain/contants/Messages';

export class UserLoginService {
	constructor(private readonly alertService: AlertService) {
	}

	login = async (userLoginRequest: UserLoginRequest): Promise<void> => {
		try {
			//todo: this code is being repeated
			const userLoginResponse = await axios.post<UserLoginResponse>(
				'http://localhost:8080/user/login',
				JSON.stringify(userLoginRequest),
			);
			localStorage.setItem('token', userLoginResponse.data.token);
			location.pathname = '/chat.html';
		} catch (e) {
			if (e.response.status === 400) {
				//todo: must be an axios custom service, must be dynamic
				await this.alertService.error(INVALID_CREDENTIALS);
			} else {
				await this.alertService.error(UNEXPECTED_ERROR);
			}
		}
	};

}
