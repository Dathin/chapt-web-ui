import axios from './ChaptAxios';
import { ContactResponse } from '../domain/response/ContactResponse';
import { UNEXPECTED_ERROR } from '../domain/contants/Messages';
import { AlertService } from './AlertService';
import { ContactChoice } from '../domain/chapt/ChoseContact';
import { ChaptService } from './ChaptService';


//todo private route
export class ChatService {

	private backgroundElement!: HTMLDivElement;
	private to = 0;

	constructor(private readonly contacts: HTMLDivElement,
							private readonly chat: HTMLDivElement,
							private readonly alertService: AlertService,
							private readonly chaptService: ChaptService) {
	}

	populateContacts = async (): Promise<void> => {
		//TODO: Unit test me: 2
		try {
			const contactsResponse = await axios.get<ContactResponse[]>('http://localhost:8080/contact');
			contactsResponse.data.forEach(contact => {
				this.contacts.appendChild(this.createContactElement(contact));
			});
		} catch (e) {
			await this.alertService.error(UNEXPECTED_ERROR);
			location.pathname = '';

		}
	};

	choseContact = async (contactChoice: ContactChoice): Promise<void> => {
		contactChoice.contacts.hidden = true;
	};

	private createContactElement = (contact: ContactResponse): HTMLDivElement => {
		const contactElement = document.createElement('div');
		contactElement.className = 'contacts__contact';
		const contactNameElement = document.createElement('div');
		contactNameElement.className = 'contacts__name';
		contactNameElement.id = '' + contact.id;
		contactNameElement.textContent = contact.eMail;
		contactElement.appendChild(contactNameElement);
		contactElement.addEventListener('click', () => this.onContactClick(contact));
		return contactElement;
	};

	private onContactClick = (contact: ContactResponse): void => {
		//todo: refresh token -> https://www.digitalocean.com/community/tutorials/js-settimeout-setinterval#:~:text=js%2C%20we%20get%20two%20methods,specified%20delay%20between%20each%20call.
		this.to = contact.id;
		this.createBackElement();
		this.createChatElement(contact);
	};

	//todo: align left
	//todo: View architecture

	//TODO: I don't need to hide and show if I create and delete
	private createChatElement = (contact: ContactResponse): void => {
		this.contacts.style.display = 'none';
		this.chat.style.display = 'flex';
		this.chat.style.alignItems = 'center';
		const chatNameElement = document.createElement('div');
		chatNameElement.className = 'chat__name';
		chatNameElement.textContent = contact.eMail;
		this.chat.appendChild(chatNameElement);
		this.backgroundElement = document.createElement('div');
		this.backgroundElement.className = 'chat__background';
		this.chat.appendChild(this.backgroundElement);
		const formElement = document.createElement('form');
		formElement.className = 'chat__input-field';
		const sendMessageElement = document.createElement('input');
		sendMessageElement.type = 'text';
		//todo: constant
		sendMessageElement.placeholder = `Text ${contact.eMail}`;
		formElement.appendChild(sendMessageElement);
		this.backgroundElement.appendChild(formElement);
		formElement.addEventListener('submit', (event: Event) => this.sendForm(event, sendMessageElement, contact));
	};

	//todo: bring font to the repo
	private sendForm = async (event: Event, sendMessageElement: HTMLInputElement, contact: ContactResponse) => {
		//todo remove:
		await this.sendMessage(sendMessageElement.value);
		event.preventDefault();
		sendMessageElement.value = '';
		sendMessageElement.placeholder = `Text ${contact.eMail}`;
	}

	//todo: Extract back element to it's own view
	private createBackElement = (): void => {
		const backElement = document.createElement('div');
		backElement.textContent = '< Back';
		backElement.addEventListener('click', this.onBackClick);
		this.chat.appendChild(backElement);
	};

	private onBackClick = (): void => {
		this.contacts.style.display = 'flex';
		this.chat.style.display = 'none';
		while (this.chat.lastElementChild) {
			this.chat.removeChild(this.chat.lastElementChild);
		}
	};


	//TODO: create intellij arrow function shortcut and stuff
	//sendMessage
	private sendMessage = async (message: string): Promise<void> => {
		this.chaptService.sendMessage(message, this.to);
	};

	//receiveMessage
	// private receiveMessage = async (message: string): Promise<void> => {
	// 	// 	this.createMessageElement(message, 'left');
	// 	// }


}
