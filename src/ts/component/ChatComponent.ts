import { Component } from './Component';
import { ComponentCreation } from '../domain/chapt/ComponentCreation';
import { ContactResponse } from '../domain/response/ContactResponse';

export class ChatComponent extends Component {

  constructor(componentCreation: ComponentCreation, private contact: ContactResponse, private formSubmit: (event: Event, sendMessageElement: HTMLInputElement) => void) {
    super(componentCreation);
  }

  protected component(): Element {
    const div = document.createElement('div');
    // this.contacts.style.display = 'none';
    // this.chat.style.display = 'flex';
    // this.chat.style.alignItems = 'center';
    const chatNameElement = document.createElement('div');
    chatNameElement.className = 'chat__name';
    chatNameElement.textContent = this.contact.eMail;
    // this.chat.appendChild(chatNameElement);
    // this.backgroundElement = document.createElement('div');
    // this.backgroundElement.className = 'chat__background';
    // this.chat.appendChild(this.backgroundElement);
    const formElement = document.createElement('form');
    div.appendChild(formElement);
    formElement.className = 'chat__input-field';
    const sendMessageElement = document.createElement('input');
    sendMessageElement.type = 'text';
    //todo: constant
    sendMessageElement.placeholder = `Text ${this.contact.eMail}`;
    formElement.appendChild(sendMessageElement);
    // this.backgroundElement.appendChild(formElement);
    formElement.addEventListener('submit', (event: Event) => this.formSubmit(event, sendMessageElement));
    return div!;
  }

}
