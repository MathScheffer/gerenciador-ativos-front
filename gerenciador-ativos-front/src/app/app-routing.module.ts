import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAtivosComponent } from './lista-ativos/lista-ativos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';
import { ListaLocaisComponent } from './lista-locais/lista-locais.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'ativos', component:ListaAtivosComponent},
  {path: 'locais', component: ListaLocaisComponent},
  {path:'localizacoes', component: LocalizacoesComponent},
  {path:'', redirectTo: 'localizacoes', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
