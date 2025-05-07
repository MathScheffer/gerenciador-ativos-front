import { Injectable } from '@angular/core';
import { Localizacao } from './localizacao';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {
  private localizacoes: Localizacao[] = [{
    id: "1",
    tag_ativo: "xpto",
    tag_local: "local1",
    local: "Recepção",
    ativo: "monitor"
  },
  {
    id: "2",
    tag_ativo: "xpto2",
    tag_local: "local3",
    local: "UTI 2",
    ativo: "gabinete",
    ultima_localizacao: "Recepção"
  }]

  constructor() { }

  listarLocalizacoes = () => this.localizacoes;
}
