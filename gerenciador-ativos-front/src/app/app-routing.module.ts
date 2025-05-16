import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAtivosComponent } from './lista-ativos/lista-ativos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';
import { ListaLocaisComponent } from './lista-locais/lista-locais.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormAtivosComponent } from './form-ativos/form-ativos.component';
import { FormLocalComponent } from './form-local/form-local.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'ativos', component:ListaAtivosComponent},
  {path: 'locais', component: ListaLocaisComponent},
  {path:'localizacoes', component: LocalizacoesComponent},
  {path:'cadastro', component: CadastroComponent, title: 'cadastro', children:[
    {path: 'ativo', component: FormAtivosComponent, title: 'cadastro ativo', },
    {path: 'local', component: FormLocalComponent, title: 'cadastro local'},
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
