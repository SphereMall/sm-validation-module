import {Validator} from '../Validator';

export class FormElement extends HTMLElement {
    setValidator(): void {
        let validator = new Validator(this);

        console.log(validator.validate());
    }
}