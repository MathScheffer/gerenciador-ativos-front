import { Component } from '@angular/core';
import { GerenciadorService } from '../gerenciador.service';
import { Ativos } from '../ativos';
import { LocaisService } from '../locais.service';
import { Local } from '../local';

@Component({
  selector: 'app-lista-locais',
  standalone: false,
  templateUrl: './lista-locais.component.html',
  styleUrl: './lista-locais.component.css'
})
export class ListaLocaisComponent {
  nomePesquisa?: string;
  listaLocais: Local[] = [];
  constructor(private locaisService: LocaisService){
      locaisService.listarLocais().subscribe(locais => {
        this.listaLocais = locais
      });
  }

}
