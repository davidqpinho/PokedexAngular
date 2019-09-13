import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PokemonApiService } from './shared/pokemon-api.service';

@Injectable()
export class PokemonListResolver implements Resolve<any> {
  constructor(private pokemonService: PokemonApiService){

  }

  resolve() {
    return this.pokemonService.getPokemonList();
  }
}
