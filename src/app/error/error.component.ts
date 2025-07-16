import { Component } from '@angular/core';
import { GerenciadorMqttService } from '../gerenciador-mqtt.service';
import { Subscription } from 'rxjs';
import { IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-error',
  standalone: false,
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  private mqttSubscription?: Subscription
  setError: number = 0;
  constructor(private mqttService: GerenciadorMqttService){
    this.mqttSubscription = this.mqttService.locaizacaoErros$.subscribe((message: IMqttMessage) => {
      const decodeURI = new TextDecoder('utf-8')

      const decoded = decodeURI.decode(message.payload)
      
      alert(JSON.parse(JSON.stringify(decoded)))
    })
  }
}
