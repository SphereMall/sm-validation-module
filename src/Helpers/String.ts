export class String {
    public static capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}