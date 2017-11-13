
import {Guid} from './Helpers/Guid';
import {FormElement} from './Elements/FormElement';

export class ValidationModule {

    private elements: HTMLElement[] = [];

    init() {
        let elements: NodeList = document.body.querySelectorAll(`form`);

        Object.keys(elements).forEach(key => {
            let currentElement = <FormElement>elements[+key];

            let elementIdAttr = currentElement.attributes.getNamedItem('data-validation-element-id');
            if (elementIdAttr == null) {
                let elementId = Guid.get();
                currentElement.setAttribute('data-validation-element-id', elementId);
                currentElement.setValidator();

                this.elements.push(currentElement);
            }
        });
    }

    getElements() {
        return this.elements;
    }
}

export const module = new ValidationModule();
module.init();