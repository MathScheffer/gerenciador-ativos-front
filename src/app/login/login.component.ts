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
  erro?: boolean
  emailValido: boolean = false;

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

    acionarValidacao = (pipeResult: boolean) => {
      
      this.emailValido = pipeResult
    }

    fecharErro = () => {
      this.erro = false
    }

    logar = () => {
      this.auth.login(this.usuario)
      .then(token => {
        if(token){
          alert("Login efetuado com sucesso!")
          this.router.navigate(['/localizacoes'])
        }
      })
      .catch(err => {
        console.log(err)
        this.erro = true
      })
  }

    deslogar = () => {
      this.auth.logout()
    }
}
