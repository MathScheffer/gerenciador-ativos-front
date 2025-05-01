import { Injectable } from '@angular/core';
import { Ativos } from './ativos';

@Injectable({
  providedIn: 'root'
})
export class GerenciadorService {
  private ativos: Ativos[] = [
    {
      id: 'xpto',
      nome: 'monitor',
      id_tag: 'blablabla'
    },
    {
      id: 'xpto2',
      nome: 'gabinete',
      id_tag: 'bl123'
    }
  ]
  constructor() { }

  listarAtivos(): Ativos[]{
    return this.ativos;
  }
}
