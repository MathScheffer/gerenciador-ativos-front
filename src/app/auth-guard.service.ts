import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {
  credencial?: UserCredential
  token?: string
  constructor(private auth: Auth) { 

  }

  loginFirebaseServerless() {
      
  }
  async login(usuario: Usuario) {
    this.credencial =   await signInWithEmailAndPassword(this.auth, usuario.email, usuario.password)
    this.token = await this.credencial.user.getIdToken()
    sessionStorage.setItem('TOKEN', this.token)
    return this.token
  }

  logout() {
    signOut(this.auth)
    .then((a) => {
      sessionStorage.removeItem('TOKEN')
      alert('Usuário deslogado!')
    })
    .catch(err => alert(err))
      
  }
/*   login(usuario: Usuario): Observable<boolean> {
    return this.usuarioService.login(usuario).pipe(
      tap( (resp: any) => {
        if(resp.id){
          sessionStorage.setItem('TOKEN','logado')
          return true
        }else{
          return false;
        }
      })
    )
  } */

  verificarLogin(): boolean{
    const token = sessionStorage.getItem('TOKEN');
    return token !== undefined && token !== null && token.length > 0
  }
}
