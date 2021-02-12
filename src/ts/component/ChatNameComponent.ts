import { Component } from './Component';
import { ComponentCreation } from '../domain/chapt/ComponentCreation';

export class ChatNameComponent extends Component {

  constructor(componentCreation: ComponentCreation) {
    super(componentCreation);
  }

  protected component(): Element {
    const div = document.createElement('div');
    return div;
  }


}
