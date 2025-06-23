import { Component, OnDestroy } from '@angular/core';
import { LocalizacaoService } from '../localizacao.service';
import { Localizacao } from '../localizacao';
import { GerenciadorMqttService } from '../gerenciador-mqtt.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-localizacoes',
  standalone: false,
  templateUrl: './localizacoes.component.html',
  styleUrl: './localizacoes.component.css'
})
export class LocalizacoesComponent implements OnDestroy {
  nomePesquisa?: string;
  filtroPesquisa?: string = "ativo";
  entradaSaida: string = "entrada"
  listaLocalizacoes: Localizacao[] = []; 
  private mqttSubscription?: Subscription; // Crie uma Subscription para o evento do MQTT

  constructor(private localizacoesService: LocalizacaoService, private gerenciadorMqtt: GerenciadorMqttService){
    this.mqttSubscription = this.gerenciadorMqtt.localizacaoPersistida$.subscribe(() => {
      console.log('Evento de localização persistida recebido no componente. Listando novamente...');
      this.listar();
    });
    this.listar()
  }

  listar = () => {
    this.localizacoesService.listarLocalizacoes().subscribe(localizacoes => {
      this.listaLocalizacoes = localizacoes
    });
  }
    ngOnDestroy(): void {
    // Certifique-se de cancelar a inscrição quando o componente for destruído
    this.mqttSubscription?.unsubscribe();
  }
}
