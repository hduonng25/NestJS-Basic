export interface FindOneInterface {
    key: string;
    opStr: '<' | '<=' | '>=' | 'in' | 'not-in' | 'array-contains' | 'array-contains-any' | '==' | '!=' | '>';
    value: any;
}
