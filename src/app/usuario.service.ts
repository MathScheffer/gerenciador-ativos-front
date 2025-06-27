import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService   {
  BASE_API = `${environment.BASE_URL}/usuario`
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
