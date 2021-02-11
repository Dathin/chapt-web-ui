import { INVALID_CREDENTIALS, UNEXPECTED_ERROR } from '../domain/contants/Messages';
import axios from 'axios';
import { UserLoginService } from './UserLoginService';
import { AlertService } from './AlertService';

jest.mock('axios');

describe('should be a login service', () => {
	let userLoginService: UserLoginService;
	let alertService: AlertService;
	const userLoginRequest = { eMail: 'a', password: 'a' };

	beforeEach(() => {
		alertService = new AlertService();
		userLoginService = new UserLoginService(alertService);
	});

	it('should alert when invalid credentials', () => {
		const axiosError = { response: { status: 400 } };
		jest.spyOn(axios, 'post').mockImplementation(() => {
			throw axiosError;
		});
		const alertServiceError = jest.spyOn(alertService, 'error');

		userLoginService.login(userLoginRequest);

		expect(alertServiceError).toHaveBeenCalledWith(INVALID_CREDENTIALS);
	});

	it('should alert when unexpected response', () => {
		const axiosError = { response: {} };
		jest.spyOn(axios, 'post').mockImplementation(() => {
			throw axiosError;
		});
		const alertServiceError = jest.spyOn(alertService, 'error');

		userLoginService.login(userLoginRequest);

		expect(alertServiceError).toHaveBeenCalledWith(UNEXPECTED_ERROR);
	});

	it('should login', () => {
		const axiosResponse = { data: { token: 'ey...' }, status: 200 };
		jest
			.spyOn(axios, 'post')
			.mockImplementation(() => Promise.resolve(axiosResponse));

		userLoginService.login(userLoginRequest);
	});
});
