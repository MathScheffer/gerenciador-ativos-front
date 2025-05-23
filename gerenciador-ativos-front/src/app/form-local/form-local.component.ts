import { Component } from '@angular/core';
import { LocaisService } from '../locais.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from '../local';

@Component({
  selector: 'app-form-local',
  standalone: false,
  templateUrl: './form-local.component.html',
  styleUrl: './form-local.component.css'
})
export class FormLocalComponent {
  local: Local = new Local();
  id?: number;
  botaoAcao = "Salvar";

  constructor(private locaisService: LocaisService, private router: Router, private route: ActivatedRoute){
    this.id = parseInt(this.route.snapshot.params['id']);
    
    console.log(this.id.toLocaleString())
    if(this.id){
      this.botaoAcao = "Editar"
      this.locaisService.buscarPorId(this.id).subscribe( (local: Local) => {
        this.local = local
      })
    }
  }
  
  salvar = () => {
    console.log(this.local.nome)
    if (this.id){
      this.locaisService.buscarPorId(this.id).subscribe((local: Local) => {
        if(this.local.nome && this.id){
          this.locaisService.editar(this.id, this.local).subscribe( (local: Local) => {
            alert(`Local ${local.id} editado !`)
            this.router.navigate(['locais'])
          })
        }else{
          alert(`Local de ID ${this.id} não encontrado!`)
        }
      })
    }else{
      if(this.local.nome && this.local.tag_local){
        this.locaisService.listarLocais().subscribe( (locais: Local[]) => {
          locais.sort((a: Local, b: Local) => {
            if(a.id < b.id){
              return -1
            }
            if(a.id > b.id){
              return 1
            }
            return 0;
          })
          let id: any = locais[locais.length - 1]?.id
          id = id ? parseInt(id) + 1 : 1
          this.local.id = id.toString();
  
          this.locaisService.adicionarLocal(this.local).subscribe(local => {
            this.local = new Local();
            this.router.navigate(['/locais'])
          })
        })
      }
    }

  }

  inicio = () => {}
}
