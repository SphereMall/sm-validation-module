import {IRule} from './IRule';
import {RequiredRule} from './RequiredRule';
import {EmailRule} from './EmailRule';

export class RuleService {
    private element: HTMLElement;
    private rules: any = {};

    constructor(element: HTMLElement) {
        this.element = element;
    }

    public getRules() {
        let validationRules = this.element.getAttribute('data-validation-sm').split('|');
        validationRules.forEach(ruleRaw => {

            let ruleObj = <IRule>RuleService.getRuleObj(ruleRaw);
            if (ruleObj) {
                Object.keys(ruleObj.get()).forEach(property => {
                    this.rules[property] = ruleObj.get()[property];
                });
            }
        });

        return this.rules;
    }

    public getKey() {
        return this.element.getAttribute('name');
    }

    private static getRuleObj(ruleRaw: string) {
        let rule = ruleRaw.split(':');
        let params = rule.length > 1 ? rule.slice(1) : {};
        switch (rule[0]) {
            case 'required':
                return new RequiredRule(params);

            case 'email':
                return new EmailRule(params);
        }

        return null;
    }
}