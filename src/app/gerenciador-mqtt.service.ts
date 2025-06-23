import { Injectable } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { IMqttClient, IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subject, Subscription } from 'rxjs';
import { LocalizacaoService } from './localizacao.service';
import { Localizacao } from './localizacao';
import { Ativos } from './ativos';
import { Local } from './local';
@Injectable({
  providedIn: 'root'
})
export class GerenciadorMqttService implements OnDestroy{
  subscription?: Subscription
  mensagensParaPersistir: string[] = [];
  localizacao: Localizacao = new Localizacao();
  private _localizacaoPersistida = new Subject<void>();
  localizacaoPersistida$ = this._localizacaoPersistida.asObservable(); // Exponha como um Observable


  constructor(private mqttService: MqttService, private localizacaoService: LocalizacaoService){
    this.subscription = this.mqttService.observe('localizacoes/persistir').subscribe( (message: IMqttMessage) => {
      console.log('Mensagem para persistir recebida!')
      console.log(JSON.parse(message.payload.toString()))
      const tag_ativo = JSON.parse(message.payload.toString()).tag_ativo;
      const tag_local = JSON.parse(message.payload.toString()).tag_local;
      console.log(JSON.parse(message.payload.toString()).tag_local)
      if(tag_ativo && tag_local){
        //TODO verificar o que está acontecendo na saida
        localizacaoService.verificarRegistro(tag_ativo, tag_local, (ativo: Ativos, local: Local, registrosIdenticos: Localizacao[], registrosEntradasAtivos: Localizacao[]) => {
            if(ativo && local){
                  this.localizacao.data_entrada = new Date()
                  //o arduino mandou mais um sinal. Se houver um registro da mesma combinação, preciso apontar uma saída nos registros velhos.
                  if (registrosEntradasAtivos)  {
                    console.log(registrosEntradasAtivos)
                    this.localizacaoService.corrigirSaidas(registrosEntradasAtivos, this.localizacao.data_entrada)
                  };
                  //Aqui eu corrijo que uma saída em todos os locais que o ativo passou anteriormente
                  if (registrosIdenticos){
                     this.localizacaoService.corrigirSaidas(registrosIdenticos, this.localizacao.data_entrada )
                  }
                  
                  this.localizacao.ativo = ativo.nome
                  this.localizacao.local = local.nome
                  this.localizacao.tag_ativo = tag_ativo
                  this.localizacao.tag_local = tag_local
                  this.localizacao.id = Date.now().toString()
                  console.log(`Adicionando via mqtt: ${JSON.stringify(this.localizacao)}`)
                  this.localizacaoService.postLocalizacao(this.localizacao).subscribe(localizacao => {
                    this.localizacao = new Localizacao();
                      // Emita um valor através do Subject para notificar os ouvintes
                    this._localizacaoPersistida.next();
                  })
              }else{
                if (!ativo){
                  alert("Tag do ativo não foi encontrada!")
                }else if(!local){
                  alert("Tag do local não foi encontrada!")
                }
              }
        })
      }

      
      this.mensagensParaPersistir.push(message.payload.toString())
    })
  }

    ngOnDestroy(): void {
    this.subscription?.unsubscribe();
     this._localizacaoPersistida.complete(); // Não esqueça de completar o Subject
  }
}


