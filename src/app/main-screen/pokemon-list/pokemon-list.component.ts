import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonApiService } from './../shared/pokemon-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPokemonList } from '../shared/pokemon.model';
import { UserInputService } from '../shared/user-input.service';
import { Subject } from 'rxjs';
import { LogScreenService } from '../shared/log-screen.service';
import { AnimationService } from '../shared/animation.service';

@Component({
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemonListOutput;
  selectorPosition: number;

     constructor(
       private pokemonApi: PokemonApiService,
       private route: ActivatedRoute,
       private router: Router,
       private inputService: UserInputService,
       private logEmitter: LogScreenService,
       private animationService: AnimationService
     ) {
      this.selectorPosition = 0;
      this.inputService.enterButton = new Subject();
      this.inputService.enterButton.subscribe((click: boolean) => {
       if (click === true) {
        if (this.selectorPosition !== 0) {
          this.router.navigate(['/pokemons/' + this.selectorPosition]);
        }
       }
      });
     }

    ngOnInit() {
        this.pokemonListOutput = this.returnPokemonList(this.route.snapshot.data['pokemons']);
        setTimeout(() => {this.logEmitter.logListener.next('Get a pokemon!!!'); }, 200);
        setTimeout(() => {this.animationService.pokemonList.next(true); }, 200);
     }
    returnPokemonList(jsonFile: IPokemonList) {
      const pokemonList = new Array();
      const apiPokemonList = jsonFile.results;
      apiPokemonList.forEach(pokemon => {
          pokemonList.push({
            'name': pokemon.name,
            'url': pokemon.url,
            'number': this.returnPokemonNumber(pokemon.url),
          });
      });
      return pokemonList;
    }
    returnPokemonNumber(url: string): number {
      const ret = url.split("/");
      return +ret[ret.length - 2];
    }
    pokemonSelection(id: number) {
      if (this.selectorPosition === id){
        this.router.navigate(['/pokemons/' + id]);
      }
      this.selectorPosition = id;
    }
    ngOnDestroy(){
      this.inputService.enterButton.unsubscribe();
    }
  }
