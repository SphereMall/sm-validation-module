import {Validator} from '../Validator';

export class FormElement {
    private validator: Validator;
    private form: HTMLFormElement;
    private formId: string;

    constructor(element: HTMLFormElement, elementId: string) {
        this.form = element;
        this.formId = elementId;
        this.validator = new Validator(this);
    }

    getFrom() {
        return this.form;
    }

    getFromId() {
        return this.formId;
    }
}