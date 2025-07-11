import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAtivosComponent } from './ativos/lista-ativos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';
import { ListaLocaisComponent } from './locais/lista-locais.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormAtivosComponent } from './form-ativos/form-ativos.component';
import { FormLocalComponent } from './form-local/form-local.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.guard';
import { FormLocalizacoesComponent } from './form-localizacoes/form-localizacoes.component';
import { TesteMqttComponent } from './teste-mqtt/teste-mqtt.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnAuth = () => redirectUnauthorizedTo(['login'])
const routes: Routes = [
  {path:'teste', component:TesteMqttComponent},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'ativos', component:ListaAtivosComponent, ...canActivate(redirectUnAuth)},
  {path: 'ativos/edit/:id', component: FormAtivosComponent, title: 'Editar ativos', canActivate: [AuthGuard]},
  {path: 'locais', component: ListaLocaisComponent, ...canActivate(redirectUnAuth)},
  {path: 'locais/edit/:id', component: FormLocalComponent, title: 'Editar Local', canActivate: [AuthGuard]},
  {path:'localizacoes', component: LocalizacoesComponent},
  {path:'cadastro', component: CadastroComponent, title: 'cadastro', children:[
    {path: 'ativo', component: FormAtivosComponent, title: 'cadastro ativo'},
    {path: 'local', component: FormLocalComponent, title: 'cadastro local'},
    {path: 'entrada', component: FormLocalizacoesComponent, title: 'Cadastro entrada'},
    {path: 'saida', component: FormLocalizacoesComponent, title: 'Cadastro saida'},
  ], canActivate: [AuthGuard]
  },
  {path:'', redirectTo: 'localizacoes', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
