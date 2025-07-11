import { Pipe, PipeTransform } from '@angular/core';
import { Ativos } from './ativos';

@Pipe({
  name: 'filter',
  standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(lista: any[] ,chave: string | undefined  ,valor: string | undefined | null): any[] {
    console.log(chave)
    if(chave === 'data_saida') {
      if(valor == 'entrada') {
        console.log(`Lista de entrada: ${JSON.stringify(lista[0])}`)
        return lista.filter(obj => obj['data_saida'] === null)
      }else if(valor === 'saida'){
        return lista.filter(obj => obj['data_saida'] !== null)
      }else{
        return lista
      }
    }

    if(!valor || !chave || valor?.length < 3){
      return lista;
    }

    if(chave === 'local'){
      return lista.filter(obj => obj['Local']['nome'] ?.toLocaleLowerCase().includes(valor?.toLocaleLowerCase()))
    }else if(chave === 'ativo'){
      return lista.filter(obj => obj['Ativo']['nome'] ?.toLocaleLowerCase().includes(valor?.toLocaleLowerCase()))
    }


    
    return lista.filter(obj => obj[chave] ?.toLocaleLowerCase().includes(valor?.toLocaleLowerCase()))
  }

}
