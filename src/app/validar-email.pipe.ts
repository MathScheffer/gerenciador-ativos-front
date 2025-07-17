import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validarEmail',
  standalone: false
})
export class ValidarEmailPipe implements PipeTransform {

  transform(email: string | undefined | null): boolean {
    if (email === null || email === undefined || email.trim() === '') {
      return false; 
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

}
