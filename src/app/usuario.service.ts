import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService   {
  BASE_API = "http://localhost:3000/api/usuario"
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":"application/json"
    })
  }

  private usuario: Usuario = new Usuario()

  constructor(private http: HttpClient) {
   
   }

  login = (user: Usuario) : Observable<Usuario> => {
    return  this.http.post<Usuario>(this.BASE_API, user, this.httpOptions)
  }
}
