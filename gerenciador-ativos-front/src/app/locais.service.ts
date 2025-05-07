import { Injectable } from '@angular/core';
import { Local } from './local';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {
  private locais: Local[] = [
    {id: "1", nome: "Recepção", tag_local: "local1"},
    {id: "2", nome: "UTI 1", tag_local: "local2"},
    {id: "3", nome: "UTI 2",tag_local: "local3"}
  ]
  constructor() { }

  listarLocais = (): Local[] => this.locais;
}
