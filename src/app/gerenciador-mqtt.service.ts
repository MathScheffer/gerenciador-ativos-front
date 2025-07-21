import { Injectable } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { IMqttClient, IMqttMessage, MqttService } from 'ngx-mqtt';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { LocalizacaoService } from './localizacao.service';
import { Localizacao } from './localizacao';
import { Ativos } from './ativos';
import { Local } from './local';
@Injectable({
  providedIn: 'root'
})
export class GerenciadorMqttService implements OnDestroy{
  constructor(private mqttService: MqttService){
  }

    subscribeTopic(topic: string): Observable<IMqttMessage> {
      return this.mqttService.observe(topic)
    }
    ngOnDestroy(): void {
  }
}


