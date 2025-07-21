import { Component, OnDestroy } from '@angular/core';
import { LocalizacaoService } from '../localizacao.service';
import { Localizacao } from '../localizacao';
import { GerenciadorMqttService } from '../gerenciador-mqtt.service';
import { Subscription } from 'rxjs';
import { SupabaseStorageService } from '../supabase-storage.service';

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
  private mqttSubscription?: Subscription;

  constructor(private localizacoesService: LocalizacaoService, private gerenciadorMqtt: GerenciadorMqttService, private supabaseService: SupabaseStorageService){
    this.mqttSubscription = this.gerenciadorMqtt.subscribeTopic('localizacoes/persistida').subscribe(() => {
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
      console.log('destroyinh...')
    this.mqttSubscription?.unsubscribe();
  }

  edge = () => {
    this.supabaseService.edge()
    .then(msg => {
      console.log(msg)
    })
    .catch(err => {
      console.log(err)
      alert(err)
    })

  }
}
