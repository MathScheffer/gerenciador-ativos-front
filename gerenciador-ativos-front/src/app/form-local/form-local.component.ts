import { Component } from '@angular/core';
import { LocaisService } from '../locais.service';
import { Router } from '@angular/router';
import { Local } from '../local';

@Component({
  selector: 'app-form-local',
  standalone: false,
  templateUrl: './form-local.component.html',
  styleUrl: './form-local.component.css'
})
export class FormLocalComponent {
  local: Local = new Local();

  constructor(private locaisService: LocaisService, private router: Router){}
  salvar = () => {
    console.log(this.local.nome)
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
        const id = locais[locais.length - 1].id
        this.local.id = id ? id + 1 : 1;

        this.locaisService.adicionarLocal(this.local).subscribe(local => {
          this.local = new Local();
          this.router.navigate(['/locais'])
        })
      })
    }
  }
  inicio = () => {}
}
