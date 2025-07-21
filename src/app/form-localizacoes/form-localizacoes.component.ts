import { Component } from '@angular/core';
import { LocalizacoesComponent } from '../localizacoes/localizacoes.component';
import { Localizacao } from '../localizacao';
import { LocalizacaoService } from '../localizacao.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Ativos } from '../ativos';
import { Local } from '../local';

@Component({
  selector: 'app-form-localizacoes',
  standalone: false,
  templateUrl: './form-localizacoes.component.html',
  styleUrl: './form-localizacoes.component.css'
})
export class FormLocalizacoesComponent {
  localizacao: Localizacao = new Localizacao
  id?: number
  entradaSaida?: string
  titulo?: string = ""
  constructor(private localizacoesService: LocalizacaoService, private router: Router, private route: ActivatedRoute) {
      this.id = parseInt(this.route.snapshot.params['id'])
      this.titulo = this.route.snapshot.title
  }

  salvar = () => {
      if(this.localizacao?.tag_ativo && this.localizacao.tag_local){ 
        this.localizacoesService.listarLocalizacoes().subscribe( (localizacoes: Localizacao[]) => {
          this.localizacao.id = Date.now().toString();
          this.localizacao.data_entrada = new Date()

          this.localizacoesService.postLocalizacao(this.localizacao).subscribe(localizacao => {
              this.localizacao = new Localizacao();
              this.router.navigate(['/localizacoes'])
          })
        })
      }
  }

  inicio = () => {}
}
