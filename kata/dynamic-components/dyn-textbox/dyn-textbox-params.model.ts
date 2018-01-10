export interface DynamicTextBoxParams {
    label: string;
    defaultValue: any;
    placeHolder: string;
    validators: any[];
    errorMessages: { errorKey: string, errorMessage: string }[];
}