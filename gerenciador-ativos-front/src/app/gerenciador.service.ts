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
      tag_ativo: 'blablabla'
    },
    {
      id: 'xpto2',
      nome: 'gabinete',
      tag_ativo: 'bl123'
    }
  ]
  constructor() { }

  listarAtivos(): Ativos[]{
    return this.ativos;
  }
}
