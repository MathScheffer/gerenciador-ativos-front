import { Injectable } from '@angular/core';
import { Local } from './local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {

  BASE_API = `${environment.BASE_URL}/local`
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
