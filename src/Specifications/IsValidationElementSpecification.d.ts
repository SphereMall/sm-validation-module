import { ISpecification } from "./ISpecification";
export declare class IsValidationElementSpecification implements ISpecification<HTMLElement> {
    IsSatisfiedBy(candidate: HTMLElement): boolean;
}
