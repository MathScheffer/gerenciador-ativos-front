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
  localizacoesPersistidasSubscription?: Subscription
  errosSubscription?: Subscription

  mensagensParaPersistir: string[] = [];
  localizacao: Localizacao = new Localizacao();

  private _localizacaoPersistida = new Subject<void>();
  localizacaoPersistida$ = this._localizacaoPersistida.asObservable(); 

  private __erros = new Subject<IMqttMessage>();
  locaizacaoErros$ = this.__erros.asObservable();

  constructor(private mqttService: MqttService){
    this.localizacoesPersistidasSubscription = this.mqttService.observe('localizacoes/persistida').subscribe( (message: IMqttMessage) => {
      console.log('Mensagem para persistir recebida!')

      this._localizacaoPersistida.next();
    })

    this.errosSubscription = this.mqttService.observe('localizacoes/erros').subscribe( (message: IMqttMessage) => {
      console.log('Erro identificado!')
      
      this.__erros.next(message);
    })
  }

    ngOnDestroy(): void {
    this.localizacoesPersistidasSubscription?.unsubscribe();
     this._localizacaoPersistida.complete(); // Não esqueça de completar o Subject
  }
}


