import { Component, OnDestroy } from '@angular/core';
import { IMqttClient, IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teste-mqtt',
  standalone: false,
  templateUrl: './teste-mqtt.component.html',
  styleUrl: './teste-mqtt.component.css'
})
export class TesteMqttComponent implements OnDestroy{
  subscription?: Subscription
  messages: string[] = [];
  constructor(private mqttService: MqttService){
    this.subscription = this.mqttService.observe('localizacoes/aPersistir').subscribe( (message: IMqttMessage) => {
      console.log('Mensagem recebida!')
      this.messages.push(message.payload.toString())
    })
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
