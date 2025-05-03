import { Component } from '@angular/core';
import { GerenciadorService } from '../gerenciador.service';
import { Ativos } from '../ativos';

@Component({
  selector: 'app-lista-ativos',
  standalone: false,
  templateUrl: './lista-ativos.component.html',
  styleUrl: './lista-ativos.component.css'
})
export class ListaAtivosComponent {
  nomePesquisa?: string;
  listaAtivos:  Ativos[]
  constructor(private gerenciadorService: GerenciadorService){
    this.listaAtivos = gerenciadorService.listarAtivos();
  }
}
