import { Component } from './Component';
import { ComponentCreation } from '../domain/chapt/ComponentCreation';

export class ChatBackComponent extends Component {


  constructor(componentCreation: ComponentCreation, private clickCallback: () => void) {
    super(componentCreation);
  }

  protected component(): Element {
    const div = document.createElement('div');
    div.textContent = '< Back';
    div.addEventListener('click', () => this.clickCallback());
    return div;
  }

}
