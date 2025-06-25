import { Pipe, PipeTransform } from '@angular/core';
import { Ativos } from './ativos';

@Pipe({
  name: 'filter',
  standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(lista: any[] ,chave: string | undefined  ,valor: string | undefined | null): any[] {
    if(chave === 'data_saida') {
      if(valor == 'entrada') {
        console.log(`Lista de entrada: ${JSON.stringify(lista)}`)
        return lista.filter(obj => obj[chave] === null)
      }else if(valor === 'saida'){
        return lista.filter(obj => obj[chave] !== null)
      }else{
        return lista
      }
    }

    if(!valor || !chave || valor?.length < 3){
      return lista;
    }


    
    return lista.filter(obj => obj[chave] ?.toLocaleLowerCase().includes(valor?.toLocaleLowerCase()))
  }

}
