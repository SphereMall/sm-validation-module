import {IsValidationElementSpecification} from './Specifications/IsValidationElementSpecification';
import {validate, collectFormValues} from 'validate.js';
import {RuleService} from './Rules/RuleService';
import {FormElement} from './Elements/FormElement';

export class Validator {
    private formElement: FormElement;
    private rules: any = {};

    constructor(formElement: FormElement) {
        this.formElement = formElement;
        this.init();
    }

    validate(values) {
        let rules = {};
        Object.keys(values).forEach(valueKey => {
            rules[valueKey] = this.rules[valueKey];

            if (!values[valueKey]) {
                values[valueKey] = null;
            }
        });

        return validate(values, rules);
    }

    private init() {
        let isValidationEl = new IsValidationElementSpecification();
        let formChildElements = this.formElement.getFrom().childNodes;

        Object.keys(formChildElements).forEach(key => {
            let element = <HTMLElement>formChildElements[+key];
            if (isValidationEl.IsSatisfiedBy(element) && element.getAttribute('name')) {
                let rule = new RuleService(element);
                this.rules[rule.getKey()] = rule.getRules();

                this.setListener(element, 'blur', rule.getKey());
            }
        });

        let buttons = this.formElement.getFrom().querySelectorAll('button, input[type="submit"]');
        if (buttons.length && buttons.length > 1) {
            return;
        }

        this.setListener(buttons.item(0));
    }

    private setListener(element, event = 'click', elementKey = undefined) {
        element.addEventListener(event, e => {
            let values = {};
            if (elementKey === undefined) {
                values = collectFormValues(this.formElement.getFrom());
            } else {
                values[elementKey] = (<HTMLInputElement>element).value;
            }

            this.clearErrors(elementKey);

            let validateResult = this.validate(values);
            if (validateResult) {
                e.preventDefault();
                this.showErrors(validateResult);
            }
        });

    }

    private clearErrors(errorElement = undefined) {
        let elements = this.formElement.getFrom().querySelectorAll('[data-validation-sm-associate-form="' + this.formElement.getFromId() + '"]');

        Object.keys(elements).forEach(key => {
            if (errorElement == undefined) {
                elements[key].remove();
            } else {
                if (errorElement == (<HTMLElement>elements[key]).getAttribute('data-validation-sm-associate-element')) {
                    elements[key].remove();
                }
            }
        });
    }

    private showErrors(validationResult) {
        Object.keys(validationResult).forEach(key => {
            let input = this.formElement.getFrom().querySelector('[name="' + key + '"]');

            Object.keys(validationResult[key]).forEach(errorKey => {
                let errorElement = <HTMLSpanElement>this.formElement.getFrom().querySelector('[data-validation-sm-associate-element="' + key + '"]');
                if (errorElement) {
                    errorElement.innerText = validationResult[key][errorKey];
                    return;
                }

                errorElement = <HTMLSpanElement>document.createElement('span');
                errorElement.setAttribute('data-validation-sm-associate-form', this.formElement.getFromId());
                errorElement.setAttribute('data-validation-sm-associate-element', key);
                errorElement.className = 'validation-sm-error validation-sm-element-' + key;
                errorElement.innerText = validationResult[key][errorKey];
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            });
        });
    }
}