import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
 import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  rotaAtual: string = "";
  ehCadastro: boolean = false;
  constructor (private route: Router, private activatedRoute: ActivatedRoute){
    route.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        console.log(event.url)
        
        this.ehCadastro = event.url === '/cadastro/local' || event.url === '/cadastro/ativo' || event.url === '/cadastro/entrada' || event.url === '/cadastro/saida'
        if(event.url === '/cadastro/local' || event.url === '/cadastro/ativo' || event.url === '/cadastro/entrada' || event.url === '/cadastro/saida') {
            this.rotaAtual = event.url 
        }
      }
    })
  }

  naoAvancar = (e: any) => {
    console.log(e.target.routerlinkactive)
  }
}
