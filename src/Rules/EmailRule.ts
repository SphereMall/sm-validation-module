import {IRule} from './IRule';

export class EmailRule implements IRule {
    private params;

    constructor(params) {
        this.params = params;
    }

    get(): object {
        return {
            email: true
        };
    }

}