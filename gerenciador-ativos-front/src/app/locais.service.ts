import { Injectable } from '@angular/core';
import { Local } from './local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {
  private locais: Local[] = [
    {id: 1, nome: "Recepção", tag_local: "local1"},
    {id: 2, nome: "UTI 1", tag_local: "local2"},
    {id: 3, nome: "UTI 2",tag_local: "local3"}
  ]
  BASE_API = "http://localhost:3000/locais"
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":"application/json"
    })
  }
  constructor(private http: HttpClient) { }

  listarLocais = (): Observable<Local[]> => {
    return this.http.get<Local[]>(this.BASE_API)
  }

    adicionarLocal = (local: Local): Observable<Local> => {
  
      return this.http.post<Local>(`${this.BASE_API}`, local, this.httpOptions)
    }
}
