import {Validator} from '../Validator';

export class FormElement extends HTMLElement {
    private validator: Validator;

    setValidator(): void {
        this.validator = new Validator(this);
    }

    validate() {
        console.log(this.validator.validate());
    }
}