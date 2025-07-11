import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { 

  }

  login(usuario: Usuario): Observable<boolean> {
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
  }

  verificarLogin(): boolean{
    const token = sessionStorage.getItem('TOKEN');
    return token !== undefined && token !== null && token.length > 0
  }
}
