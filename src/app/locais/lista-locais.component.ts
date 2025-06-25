import { Component } from '@angular/core';
import { GerenciadorService } from '../gerenciador.service';
import { Ativos } from '../ativos';
import { LocaisService } from '../locais.service';
import { Local } from '../local';
import { AuthGuardService } from '../auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-locais',
  standalone: false,
  templateUrl: './lista-locais.component.html',
  styleUrl: './lista-locais.component.css'
})
export class ListaLocaisComponent {
  nomePesquisa?: string;
  listaLocais: Local[] = [];
  constructor(private locaisService: LocaisService, private authService: AuthGuardService, private router: Router){
    this.listar()
  }

  listar = () => {
    this.locaisService.listarLocais().subscribe(locais => {
      this.listaLocais = locais
    });
  }

  deletar = (id: number) => {
    if(!this.authService.verificarLogin()){
      this.router.navigate(['/login'])
    }else{
      console.log('deletando...')
      try{
        this.locaisService.deletar(id).subscribe( (locall: Local) => {
          alert(`Local ${id} deletado!`)
    
          this.listar()
        })
      }
      catch(err){
        console.log(err)
      }
    }
  } 
}
