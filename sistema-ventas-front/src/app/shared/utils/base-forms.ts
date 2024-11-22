import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { measureMemory } from 'vm';

@Injectable({ providedIn: 'root' })
export class BaseForm {
  constructor() {}

  isValidfield(form: AbstractControl | null) {
    var bandera = false;

    if (form) bandera = form.touched || (form.dirty && form.invalid);

    return bandera;
  }
  getErrorMessage(form: AbstractControl | null) {
    let message = '';

    if (form) {
      const { errors } = form;

      if (errors) {
        const messages: any = {
          required: 'Campo Requerido',
          email: 'Formato Invalido',
          pattern: 'Formato invalido',
          min: 'El rango no es correcto',
          max: 'El ranfo no es correcto',
          minlenght: 'Formato invalido',
        };

        const errorKey = Object.keys(errors).find(Boolean);
        if (errorKey) message = messages[errorKey];
      }
    }
    return message;
  }
}
