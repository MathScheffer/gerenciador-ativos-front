import { Injectable } from '@angular/core';
import { Ativos } from './ativos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AtivosResultSet } from './ativos/AtivosResultset';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GerenciadorService {
  private ativos: Ativos[] = [
    {
      id: "1",
      nome: 'monitor',
      tag_ativo: 'blablabla'
    },
    {
      id: "2",
      nome: 'gabinete',
      tag_ativo: 'bl123'
    }
  ]

  BASE_API = `${environment.BASE_URL}/ativo`
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":"application/json"
    })
  }
  constructor(private http: HttpClient) { }

  listarAtivos(): Observable<Ativos[]>{
    console.log(`${this.BASE_API}/ativo`)
    return this.http.get<Ativos[]>(`${this.BASE_API}`)
  }

  buscarPorId(id: number): Observable<Ativos> {
    return this.http.get<Ativos>(`${this.BASE_API}/${id}`, this.httpOptions)
  }
  
  adicionarAtivo = (ativo: Ativos): Observable<Ativos> => {
    return this.http.post<Ativos>(`${this.BASE_API}`, ativo, this.httpOptions)
  }

  editar = (id: number, ativo: Ativos): Observable<Ativos> => {
    return this.http.put<Ativos>(`${this.BASE_API}/${id}`, ativo, this.httpOptions)
  }

  deletar = (id: number) : Observable<Ativos> => {
    return this.http.delete<Ativos>(`${this.BASE_API}/${id}`, this.httpOptions)
  }
}
