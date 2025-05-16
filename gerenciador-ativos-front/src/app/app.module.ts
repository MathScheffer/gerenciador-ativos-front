import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListaAtivosComponent } from './lista-ativos/lista-ativos.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { ListaLocaisComponent } from './lista-locais/lista-locais.component';
import { provideHttpClient } from '@angular/common/http';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormLocalComponent } from './form-local/form-local.component';
import { FormAtivosComponent } from './form-ativos/form-ativos.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.guard';
import { AppContainerComponent } from './app-container/app-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaAtivosComponent,
    HomeComponent,
    PageNotFoundComponent,
    LocalizacoesComponent,
    FilterPipe,
    ListaLocaisComponent,
    CadastroComponent,
    FormLocalComponent,
    FormAtivosComponent,
    LoginComponent,
    AppContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [provideHttpClient(), AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
