import { Component } from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';

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
  constructor(private auth: AuthGuardService, private router: Router){}
  logar = () => {
    this.auth.login(this.usuario).subscribe( isLogado => {
      if(isLogado){
        this.router.navigate(['/localizacoes'])
      }else{
        alert('Usuario ou password não encontrados.')
      }
    })
  }
}
