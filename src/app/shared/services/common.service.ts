import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CommonService {

  constructor() { }

  buildQueryParams(values: any): string {
    const params = Object.entries(values)
      .filter(([_, v]) => v !== null && v !== undefined && v !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`)
      .join('&');

    return params;
  }
}
