import { UserLoginService } from '../service/UserLoginService';
import { AlertService } from '../service/AlertService';

export class UserLoginController {
	private readonly eMail: HTMLInputElement;
	private readonly password: HTMLInputElement;
	private readonly loginButton: HTMLButtonElement;
	private readonly loginForm: HTMLFormElement;
	private readonly userLoginService: UserLoginService;

	constructor(userLoginService?: UserLoginService) {
		//TODO: Lazy loading
		this.userLoginService =
			userLoginService || new UserLoginService(new AlertService());
		this.eMail = <HTMLInputElement>document.querySelector('#e-mail');
		this.password = <HTMLInputElement>document.querySelector('#password');
		this.loginButton = <HTMLButtonElement>document.querySelector('#login');
		this.loginForm = <HTMLFormElement>document.querySelector('#login-form');
		this.loginButton.onclick = this.login;
	}

	private login = async (event: Event) => {
		event.preventDefault();
		await this.userLoginService.login({
			eMail: this.eMail.value,
			password: this.password.value,
		});
	};
}

new UserLoginController();
