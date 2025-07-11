import { Component } from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
/*   nome: string = "";
  password: string = ""; */
  usuario: Usuario = new Usuario()
  token?: string
  constructor(
    private auth: AuthGuardService,
    private router: Router){}
/*   logar = () => {
    this.auth.login(this.usuario).subscribe( isLogado => {
      if(isLogado){
        this.router.navigate(['/localizacoes'])
      }else{
        alert('Usuario ou password não encontrados.')
      }
    })
  } */

    logar = () => {
      this.auth.login(this.usuario)
        .then(token => {
          if(token){
            alert("Login efetuado com sucesso!")
            this.router.navigate(['/localizacoes'])
          }
        })
        .catch(err => alert("Credenciais invalidas!"))
    }

    deslogar = () => {
      this.auth.logout()
    }
}
