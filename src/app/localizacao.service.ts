import { Injectable } from '@angular/core';
import { Localizacao } from './localizacao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { LocaisService } from './locais.service';
import { GerenciadorService } from './gerenciador.service';
import { Local } from './local';
import { Ativos } from './ativos';
import { LocalizacaoResultSet } from './localizacoes/LocalzacaoResultSet';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService   {
  BASE_API = "http://localhost:3000/api/localizacao"
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":"application/json"
    })
  }
  gets :{locais: Local[], ativos: Ativos[], localizacoes: Localizacao[]} | null = null

  private localizacoes: Localizacao[] = []

  constructor(private http: HttpClient, private locaisService: LocaisService, private ativoService: GerenciadorService) {
   
   }

  listarLocalizacoes = () : Observable<Localizacao[]> => {
    return  this.http.get<Localizacao[]>(`${this.BASE_API}`)
  }

  verificarRegistro = (tag_ativo: string, tag_local: string, fnCallback: any) => {
    forkJoin({
      ativos: this.ativoService.listarAtivos(),
      locais: this.locaisService.listarLocais(),
      localizacoes: this.listarLocalizacoes()
    }).subscribe(({ativos, locais, localizacoes}) => {
      this.gets = {ativos, locais, localizacoes}

      var isTagAtivo =  this.gets.ativos.find( (ativo: Ativos) => ativo.tag_ativo === tag_ativo)
      var isTagLocal = this.gets.locais.find( (local: Local) => local.tag_local === tag_local)

      var registrosIdenticos = this.gets.localizacoes.filter( (l: Localizacao) => l.tag_local === tag_local && l.tag_ativo === tag_ativo)

      var todasEntradasAtivos = this.gets.localizacoes.filter( (l: Localizacao) =>  l.tag_ativo === tag_ativo)

      fnCallback(isTagAtivo, isTagLocal, registrosIdenticos, todasEntradasAtivos)

      return isTagAtivo  && isTagLocal && !registrosIdenticos && !todasEntradasAtivos
    })
  }

  adicionarLocalizacao = (localizacao: Localizacao, fnCallback: any) => {
      this.verificarRegistro(localizacao.tag_ativo, localizacao.tag_local, (ativo: Ativos, local: Local,  registrosIdenticos:         Localizacao[], registrosEntradasAtivos: Localizacao[]) => {


      })
  }

  postLocalizacao = (localizacao: Localizacao): Observable<Localizacao> => {
   return this.http.post<Localizacao>(this.BASE_API, localizacao, this.httpOptions )
  }

  editarLocalizacao = (id: number ,localizacao: Localizacao): Observable<Localizacao> =>{
      return this.http.put<Localizacao>(`${this.BASE_API}/${id}`, localizacao, this.httpOptions )
  }

    corrigirSaidas = async(localizacoes: Localizacao[], data: Date) => {
      for(var l of localizacoes) {
          if(!l.data_saida){
            l.data_saida = data
           await this.http.put<Localizacao>(`${this.BASE_API}/${parseInt(l.id)}`, l, this.httpOptions ).subscribe(l => {
            console.log(`Localizacao ${l.id} editada!\nData Saída: ${l.data_saida}`)
           })
/*             await this.editarLocalizacao(parseInt(l.id), l).subscribe(l => {
                console.log(`Localizacao ${l.id} editada!\nData Saída: ${l.data_saida}`)
            })  */
          }
      }
    }

    registrarSaida = async(id: number, localizacao: Localizacao) => {
      this.editarLocalizacao(id, localizacao).subscribe(l => {
        console.log(`Localizacao ${l.id} editada!`)
      }) 
    }
}
