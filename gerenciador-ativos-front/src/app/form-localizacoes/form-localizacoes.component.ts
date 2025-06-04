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
    //TODO adicionar aqui o passo a passo para editar.
    this.localizacao?.id
      if(this.localizacao?.tag_ativo&& this.localizacao.tag_local){
        this.localizacoesService.listarLocalizacoes().subscribe( (localizacoes: Localizacao[]) => {
          this.localizacao.id = Date.now().toString();
          
          this.localizacoesService.verificarRegistro(this.localizacao.tag_ativo,this.localizacao.tag_local, (ativo: Ativos, local: Local, registrosIdenticos: Localizacao[], registrosEntradasAtivos: Localizacao[]) => {
              if(ativo && local){
                if(this.titulo?.includes("saida")){
                   this.localizacao.data_saida = new Date()

                   if(registrosIdenticos.length == 0){
                    console.error(`Registro da localização não encontrado!`)
                    return;
                   }
                   let registroSemSaidaMarcada = registrosIdenticos.find( (l: Localizacao) =>  !l.data_saida )
                   
                   if(!registroSemSaidaMarcada) {
                    console.error("Todos os registros desta localização estão com saída já registrada!")
                    alert(`Saida desta localizacação já está marcada!`)
                    return;
                   }

                   registroSemSaidaMarcada.data_saida = this.localizacao.data_saida
                   this.localizacoesService.editarLocalizacao(parseInt(registroSemSaidaMarcada.id), registroSemSaidaMarcada)
                   .subscribe(localizacao => {
                      this.localizacao = new Localizacao();
                      this.router.navigate(['/localizacoes'])
                   })
                   return;
                }

                if(this.titulo?.includes("entrada")){
                   this.localizacao.data_entrada = new Date()
                  //o arduino mandou mais um sinal. Se houver um registro da mesma combinação, preciso apontar uma saída nos registros velhos.
                  if (registrosEntradasAtivos)  this.localizacoesService.corrigirSaidas(registrosEntradasAtivos, this.localizacao.data_entrada);
                  //Aqui eu corrijo que uma saída em todos os locais que o ativo passou anteriormente
                  if (registrosIdenticos){
                     this.localizacoesService.corrigirSaidas(registrosIdenticos, this.localizacao.data_entrada )
                  }
                  
                  this.localizacao.ativo = ativo.nome
                  this.localizacao.local = local.nome
                  this.localizacoesService.postLocalizacao(this.localizacao).subscribe(localizacao => {
                    this.localizacao = new Localizacao();
                    this.router.navigate(['/localizacoes'])
                  })
                }
              }else{
                if (!ativo){
                  alert("Tag do ativo não foi encontrada!")
                }else if(!local){
                  alert("Tag do local não foi encontrada!")
                }
              }
          })
        })
      }
  }

  inicio = () => {}

/*   corrigirSaidas = (localizacoes: Localizacao[], data: Date) => {
    localizacoes
      localizacoes.forEach(l => {
        if(!l.data_saida){
          l.data_saida = data
           this.localizacoesService.editarLocalizacao(parseInt(l.id), l).subscribe(l => {
        console.log(`Localizacao ${l.id} editada!`)
      }) 
        }
        
      })
    }

    registrarSaida = async(id: number, localizacao: Localizacao) => {
      this.localizacoesService.editarLocalizacao(id, localizacao).subscribe(l => {
        console.log(`Localizacao ${l.id} editada!`)
      }) 
    } */
}
