import {Guid} from './Helpers/Guid';
import {FormElement} from './Elements/FormElement';

export class ValidationModule {

    private elements: FormElement[] = [];

    init() {
        let elements: NodeList = document.body.querySelectorAll(`form`);
        Object.keys(elements).forEach(key => {
            let currentElement = <HTMLFormElement>elements[+key];
            if (!currentElement.querySelectorAll(`[data-validation-sm]`).length) {
                return;
            }

            let elementIdAttr = currentElement.attributes.getNamedItem('data-validation-sm-element-id');
            if (elementIdAttr == null) {
                let elementId = Guid.get();
                currentElement.setAttribute('data-validation-sm-element-id', elementId);
                this.elements.push(new FormElement(currentElement, elementId));
            }
        });
    }

    getElements() {
        return this.elements;
    }
}

export const instance = new ValidationModule();