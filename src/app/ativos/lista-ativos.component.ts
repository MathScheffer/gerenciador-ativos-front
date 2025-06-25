import { Component } from '@angular/core';
import { GerenciadorService } from '../gerenciador.service';
import { Ativos } from '../ativos';
import { AuthGuardService } from '../auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-ativos',
  standalone: false,
  templateUrl: './lista-ativos.component.html',
  styleUrl: './lista-ativos.component.css'
})
export class ListaAtivosComponent {
  nomePesquisa?: string;
  listaAtivos:  Ativos[] = []
  
  constructor(private gerenciadorService: GerenciadorService,
    private authService: AuthGuardService,
    private router: Router
  ){
    this.listar();
  }

  listar() {
    this.gerenciadorService.listarAtivos().subscribe(ativos => {
      this.listaAtivos = ativos;
    });
  }

  deletar(id: number){
    if(!this.authService.verificarLogin()){
      this.router.navigate(['/login'])
    }else{
      console.log('deletando')
      this.gerenciadorService.deletar(id).subscribe( (ativo: Ativos) => {
        alert(`Ativo ${id} removido!`)
        this.listar()
      })
    }
  }
}
