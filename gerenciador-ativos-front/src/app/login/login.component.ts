import { Component } from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nome: string = "";
  senha: string = "";
  constructor(private auth: AuthGuardService, private router: Router){}
  logar = () => {
    this.auth.login(this.nome, this.senha).subscribe( isLogado => {
      if(isLogado){
        this.router.navigate(['/localizacoes'])
      }else{
        alert('Usuario ou senha não encontrados.')
      }
    })
  }
}
