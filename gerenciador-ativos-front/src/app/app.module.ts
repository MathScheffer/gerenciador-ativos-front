import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListaAtivosComponent } from './lista-ativos/lista-ativos.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { ListaLocaisComponent } from './lista-locais/lista-locais.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaAtivosComponent,
    HomeComponent,
    PageNotFoundComponent,
    LocalizacoesComponent,
    FilterPipe,
    ListaLocaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
