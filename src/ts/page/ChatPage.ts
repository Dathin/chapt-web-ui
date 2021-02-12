import { AxiosStatic } from 'axios';
import axios from '../service/ChaptAxios';
import { ContactResponse } from '../domain/response/ContactResponse';
import { ContactComponent } from '../component/ContactComponent';
import { ChatBackComponent } from '../component/ChatBackComponent';
import { ChatComponent } from '../component/ChatComponent';
import { ChaptService } from '../service/ChaptService';
import { UserRefreshService } from '../service/UserRefreshService';
import { Message } from '../domain/chapt/Message';

export class ChatPage {

  private contacts = document.getElementById('contacts')!;

  private chat = document.getElementById('chat')!;

  private contact!: ContactResponse;


  constructor(private readonly axios: AxiosStatic, private readonly chaptService: ChaptService, private readonly userRefreshService: UserRefreshService) {
    this.populateContacts();
    userRefreshService.refreshTokenEveryMs(600000);
  }

  populateContacts = async (): Promise<void> => {
    const contactsResponse = await this.axios.get<ContactResponse[]>('http://localhost:8080/contact');
    debugger;
    contactsResponse.data.forEach((contact, id) => {
      new ContactComponent({
        parentElement: this.contacts,
        id: 'contact' + id,
      }, contact, this.onContactClick).createElement();
    });

  };

  onContactClick = (contactResponse: ContactResponse): void => {
    this.contact = contactResponse;
    this.contacts.style.display = 'none';
    this.chat.style.display = 'flex';
    new ChatBackComponent({ parentElement: this.chat, id: 'chatBack' }, this.onChatBackCLick).createElement();
    new ChatComponent({ parentElement: this.chat, id: 'chat2' }, this.contact, this.onFormSubmit).createElement();
  };

  onChatBackCLick = (): void => {
    this.chat.style.display = 'none';
    this.contacts.style.display = 'flex';
  };

  onFormSubmit = (event: Event, sendMessageElement: HTMLInputElement): void => {
    event.preventDefault();
    this.chaptService.sendMessage({ content: sendMessageElement.value, to: this.contact.id });
    this.resetForm(sendMessageElement);
  };

  onMessage = (message: Message) => {
    console.log(message);
  };

  private resetForm(sendMessageElement: HTMLInputElement) {
    sendMessageElement.value = '';
    sendMessageElement.placeholder = `Text ${this.contact.eMail}`;
  }


}

new ChatPage(axios, new ChaptService((message: Message) => {
  console.log(message);
}), new UserRefreshService());
