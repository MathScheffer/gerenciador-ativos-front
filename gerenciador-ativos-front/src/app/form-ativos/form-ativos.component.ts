import { Component } from '@angular/core';
import { GerenciadorService } from '../gerenciador.service';
import { Ativos } from '../ativos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-ativos',
  standalone: false,
  templateUrl: './form-ativos.component.html',
  styleUrl: './form-ativos.component.css'
})
export class FormAtivosComponent {
  ativo: Ativos = new Ativos();
  constructor(private http: GerenciadorService, 
    private router: Router){

  }
salvar = () => {
  if(this.ativo.id && this.ativo.nome && this.ativo.tag_ativo){
    this.http.adicionarAtivo(this.ativo).subscribe(ativo => {
      alert (`${ativo.nome} adicionado.`)

      this.ativo = new Ativos();
      this.router.navigate(['/ativos'])
    })
  }
  
}
inicio = () => {}
}
