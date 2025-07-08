import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public firstNameAndLastNamePattern: string = "([a-zA-Z]+) ([a-zA-Z]+)";
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  isValidPassword(control: FormControl): ValidationErrors | null {

    const value: string = control.value.trim();

    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber;

    return valid ? null : { invalidPassword: true };
  }

  isInvalidField(formGroup: FormGroup, field: string): boolean | null {
    return formGroup.controls[field].errors && formGroup.controls[field].touched;
  }

  isFieldOneEqualsFieldTwo(field1: string, field2: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value || '';
      const fieldValue2 = formGroup.get(field2)?.value || '';

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({
          notEqual: true
        })
        return {
          notEqual: true
        }
      }
      formGroup.get(field2)?.setErrors(null)
      return null
    }
  }

  isFieldOneGreaterFieldTwo(field1: string, field2: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const fieldValue1 = parseFloat(formGroup.get(field1)?.value || '0');
      const fieldValue2 = parseFloat(formGroup.get(field2)?.value || '0');

      if (fieldValue1 >= fieldValue2) {
        formGroup.get(field2)?.setErrors({
          notGreater: true
        })
        return {
          notGreater: true
        }
      }
      formGroup.get(field2)?.setErrors(null)
      return null
    }
  }

  getFieldError(formGroup: FormGroup, field: string): string | null {

    if (!formGroup.controls[field]) return null;

    const errors = formGroup.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;
        case 'min':
          return `Mínimo ${errors['min'].min}.`;
        case 'emailTaken':
          return `El email ya ha sido tomado`;
        case 'notGreater':
          return `El precio venta debe ser mayor al precio compra`;
      }
    }

    return null;
  }
}
