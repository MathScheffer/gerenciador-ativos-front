import { Injectable } from '@angular/core';
import { Local } from './local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {
  private locais: Local[] = [
    {id: "1", nome: "Recepção", tag_local: "local1"},
    {id: "2", nome: "UTI 1", tag_local: "local2"},
    {id: "3", nome: "UTI 2",tag_local: "local3"}
  ]
  BASE_API = "http://localhost:3000/api/local"
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":"application/json"
    })
  }
  constructor(private http: HttpClient, private authService: AuthGuardService) { }

  listarLocais = (): Observable<Local[]> => {
    return this.http.get<Local[]>(this.BASE_API)
  }

  adicionarLocal = (local: Local): Observable<Local> => {

    return this.http.post<Local>(`${this.BASE_API}`, local, this.httpOptions)
  }

  buscarPorId(id: number): Observable<Local> {
    return this.http.get<Local>(`${this.BASE_API}/${id}`, this.httpOptions)
  }

  deletar = (id: number): Observable<Local> => {
    return this.http.delete<Local>(`${this.BASE_API}/${id}`, this.httpOptions)
  }

  editar(id: number, local: Local) : Observable<Local> {
    return this.http.put<Local>(`${this.BASE_API}/${id}`, local, this.httpOptions)
  }

}
