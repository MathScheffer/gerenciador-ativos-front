import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
const BASE_API = "http://localhost:3000/usuario"
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

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
/*     return this.http.get<any>(BASE_API).pipe(
      tap( (resp: any) => {
        if(resp.usuario && resp.usuario == usuario && resp.senha && resp.senha == senha){
          sessionStorage.setItem('TOKEN','logado')
          return true
        }else{
          return false;
        }
      })
    ) */
  }

  verificarLogin(): boolean{
    const token = sessionStorage.getItem('TOKEN');
    return token !== undefined && token !== null && token.length > 0
  }
}
