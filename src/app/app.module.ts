import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { PokedexLogComponent } from './pokedex-log/pokedex-log.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { UserInputComponent } from './user-input/user-input.component';
import { PokemonListComponent } from './main-screen/pokemon-list/pokemon-list.component';
import { PokemonApiService } from './main-screen/shared/pokemon-api.service';
import { PokemonListResolver } from './main-screen/pokemon-list-resolver.service';
import { PokemonCardComponent } from './main-screen/pokemon-card/pokemon-card.component';
import { Page404Component } from './page404/page404.component';
import { AppRoutingModule } from './app-routing.module';
import { LogScreenService } from './main-screen/shared/log-screen.service';
import { UserInputService } from './main-screen/shared/user-input.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PokedexLogComponent,
    MainScreenComponent,
    UserInputComponent,
    PokemonListComponent,
    PokemonCardComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    PokemonApiService,
    PokemonListResolver,
    LogScreenService,
    UserInputService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
