import {ISpecification} from './ISpecification';

export class IsValidationElementSpecification implements ISpecification<HTMLElement> {

    IsSatisfiedBy(candidate: HTMLElement): boolean {
        if (!candidate.attributes) {
            return false;
        }

        if (candidate.getAttribute('data-validation-sm')) {
            return true;
        }

        return false;
    }
}