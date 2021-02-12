import { ChatService } from '../service/ChatService';
import { AlertService } from '../service/AlertService';
import { PrivateController } from './PrivateController';
import { ChaptService } from '../service/ChaptService';

export class ChatController extends PrivateController {

  private readonly chatService: ChatService;
  private readonly contacts: HTMLDivElement;
  private readonly chat: HTMLDivElement;

  constructor(chatService?: ChatService) {
		super();
		//TODO: Lazy loading
		this.contacts = <HTMLDivElement>document.getElementById('contacts');
		this.chat = <HTMLDivElement>document.getElementById('chat');
		this.chatService = chatService || new ChatService(this.contacts, this.chat,
			new AlertService(),
			new ChaptService());
	}

  populateContacts = async (): Promise<void> => {
  	await this.chatService.populateContacts();
  };

  initChat = async (): Promise<void> => {
  	alert('delete me');
  };

  choseContact = async (): Promise<void> => {
  	//onclick
  	await this.chatService.choseContact({
  		contacts: this.contacts,
  		chat: this.contacts,
  		chosenContact: { eMail: 'aa', id: 1 },
  	});

  };

}

const chatController = new ChatController();
chatController.populateContacts();
