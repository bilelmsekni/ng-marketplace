import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DynamicTextBoxParams } from 'app/dynamic-components/dyn-textbox/dyn-textbox-params.model';

@Component({
    selector: 'app-dyn-textbox',
    templateUrl: 'dyn-textbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DynamicTextBoxComponent),
            multi: true
        }
    ]
})

export class DynamicTextBoxComponent implements OnInit, ControlValueAccessor {
    textBoxGroup: FormGroup;
    @Input() dynParams: DynamicTextBoxParams;
    private formGroupClass = 'form-group';
    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.textBoxGroup = this.fb.group({
            textBoxControl: [this.dynParams.defaultValue, this.dynParams.validators]
        });
    }

    writeValue(obj: any): void {
        this.textBoxGroup.controls.textBoxControl.setValue(obj);
    }

    registerOnChange(fn: any): void {
        this.textBoxGroup.valueChanges.subscribe(res => fn(res.textBoxControl));
    }

    registerOnTouched(fn: any): void {
        fn();
    }

    getErrors(): string[] {
        if (this.textBoxGroup.controls.textBoxControl.errors) {
            this.formGroupClass = 'form-group has-error';
            return Object.keys(this.textBoxGroup.controls.textBoxControl.errors)
                .map(err => this.getErrorMessage(err));
        } else {
            this.formGroupClass = 'form-group';
            return [];
        }
    }

    private getErrorMessage(errKey: string): string {
        const errorMessage = this.dynParams.errorMessages.find(em => em.errorKey === errKey);
        if (errorMessage) {
            return errorMessage.errorMessage;
        } else {
            return '';
        }
    }
}
