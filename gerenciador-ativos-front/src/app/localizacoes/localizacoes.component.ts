import { Component } from '@angular/core';
import { LocalizacaoService } from '../localizacao.service';
import { Localizacao } from '../localizacao';

@Component({
  selector: 'app-localizacoes',
  standalone: false,
  templateUrl: './localizacoes.component.html',
  styleUrl: './localizacoes.component.css'
})
export class LocalizacoesComponent {
  nomePesquisa?: string;
  filtroPesquisa?: string = "ativo";
  listaLocalizacoes: Localizacao[]; 
  constructor(private localizacoesService: LocalizacaoService){
    this.listaLocalizacoes = this.localizacoesService.listarLocalizacoes();
  }
}
