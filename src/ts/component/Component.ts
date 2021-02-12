import { ComponentCreation } from '../domain/chapt/ComponentCreation';

export abstract class Component {

  protected constructor(private componentCreation: ComponentCreation) {
  }

  createElement = (): void => {
    this.deleteExistingComponent();
    this.createComponentWithIt();
  };

  getElement = (): Element => {
    return document.getElementById(this.componentCreation.id)!;
  };

  protected abstract component(): Element;

  private createComponentWithIt() {
    const createdComponent = this.component();
    createdComponent.id = this.componentCreation.id;
    this.componentCreation.parentElement.appendChild(createdComponent);
  }

  private deleteExistingComponent = () => {
    const existingComponent = document.getElementById(this.componentCreation.id);
    if (existingComponent) existingComponent.remove();
  };

}
