import { Pipe, PipeTransform } from '@angular/core';
import { Ativos } from './ativos';

@Pipe({
  name: 'filter',
  standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(lista: any[] ,chave: string | undefined  ,valor: string | undefined): any[] {
    console.log(`valor: ${valor} chave: ${chave}`)
    console.log(!valor || !chave || valor?.length < 3)
    if(!valor || !chave || valor?.length < 3){
      return lista;
    }
    
    return lista.filter(obj => obj[chave] ?.toLocaleLowerCase().includes(valor?.toLocaleLowerCase()))
  }

}
