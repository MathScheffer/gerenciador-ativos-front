import { Component } from '@angular/core';
import { GerenciadorService } from '../gerenciador.service';
import { Ativos } from '../ativos';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-form-ativos',
  standalone: false,
  templateUrl: './form-ativos.component.html',
  styleUrl: './form-ativos.component.css'
})
export class FormAtivosComponent {
  ativo: Ativos = new Ativos();
  id?: number;
  botaoAcao: string = "Salvar";

  constructor(private http: GerenciadorService, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthGuardService){
    this.id = parseInt(this.route.snapshot.params['id'])

    if(this.id){
      this.botaoAcao = "Editar"

      this.http.buscarPorId(this.id).subscribe( (ativo: Ativos) => {
        this.ativo = ativo
      })
    }
  }
salvar = () => {
  if(this.id){
    this.http.buscarPorId(this.id).subscribe( (ativo: Ativos) => {
      if(this.id && this.ativo.nome) {
        this.http.editar(this.id, this.ativo).subscribe( (ativo: Ativos) => {
          alert(`Ativo ${this.id} editado!`)

          this.router.navigate(['ativos'])
        })
      }
    })
  }else{
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
  
        let id: any = ativos[ativos.length - 1]?.id;
        id = id ? parseInt(id) + 1 : 1
        this.ativo.id =  id.toString()
  
        this.http.adicionarAtivo(this.ativo).subscribe(ativo => {
          this.ativo = new Ativos();
          this.router.navigate(['/ativos'])
        })
  
      })
    }
  }

  
}
inicio = () => {}
}
