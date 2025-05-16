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
  if(this.ativo.nome && this.ativo.tag_ativo){
    this.http.listarAtivos().subscribe((ativos: Ativos[]) => {
      ativos.sort((a: Ativos,b: Ativos) => {
        if(a.id < b.id){
          return -1
        }
        if(a.id > b.id){
          return 1
        }

        return 0
      })

      const id = ativos[ativos.length - 1]?.id + 1;
     
      this.ativo.id = id ? id : 1;

      this.http.adicionarAtivo(this.ativo).subscribe(ativo => {
        this.ativo = new Ativos();
        this.router.navigate(['/ativos'])
      })

    })
  }
  
}
inicio = () => {}
}
