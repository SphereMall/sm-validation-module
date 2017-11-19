import {IRule} from './IRule';

export class RequiredRule implements IRule {
    private params;

    constructor(params) {
        this.params = params;
    }

    get(): object {
        return {
            presence: true
        };
    }

}