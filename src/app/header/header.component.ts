import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
 import { Subscription } from 'rxjs';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  rotaAtual: string = "";
  ehCadastro: boolean = false;
  isAuth: boolean = false;
  img: string = '../assets/botao-de-interface-de-contorno-quadrado-de-logout.png'
  constructor (private router: Router, private auth: AuthGuardService){
    this.isAuth = this.auth.verificarLogin();

    this.router.events.subscribe(event => {
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

  deslogar = () => {
    this.auth.logout()
    
    this.isAuth = false
    this.router.navigate(['/localizacoes'])
  }
}
