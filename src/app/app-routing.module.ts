import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { PokemonListComponent } from './main-screen/pokemon-list/pokemon-list.component';
import { PokemonListResolver } from './main-screen/pokemon-list-resolver.service';
import { PokemonCardComponent } from './main-screen/pokemon-card/pokemon-card.component';
import { Page404Component } from './page404/page404.component';

export const appRoutes: Routes = [
  { path: 'pokemons', component: PokemonListComponent, resolve: { pokemons: PokemonListResolver}},
  { path: 'pokemons/:id', component: PokemonCardComponent},
  { path: '404', component: Page404Component},
  { path: '', redirectTo: '/pokemons', pathMatch: 'full'},
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
