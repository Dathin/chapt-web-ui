import { Component } from './Component';
import { ContactResponse } from '../domain/response/ContactResponse';
import { ComponentCreation } from '../domain/chapt/ComponentCreation';

export class ContactComponent extends Component {

  constructor(componentCreation: ComponentCreation, private contact: ContactResponse, private clickCallback: (contact: ContactResponse) => void) {
    super(componentCreation);
  }

  protected component(): Element {
    const div = document.createElement('div');
    div.className = 'contacts__contact';
    const contactNameElement = document.createElement('div');
    contactNameElement.className = 'contacts__name';
    contactNameElement.id = '' + this.contact.id;
    contactNameElement.textContent = this.contact.eMail;
    div.appendChild(contactNameElement);
    div.addEventListener('click', () => this.clickCallback(this.contact));
    return div;
  }

}
