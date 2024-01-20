import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[wea5IsbnValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: IsbnValidatorDirective, multi: true}]
})
export class IsbnValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return isbnValidator()(control);
  }

}

export function isbnValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isbn = control.value;
    const regexp = new RegExp('(ISBN[-]*(1[03])*[ ]*(: ){0,1})*(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})');
    return !regexp.test(isbn) ? {wea5IsbnValidator: {value: control.value}} : null;
  };
}