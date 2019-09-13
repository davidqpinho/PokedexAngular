import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonApiService } from '../shared/pokemon-api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LogScreenService } from '../shared/log-screen.service';
import { UserInputService } from '../shared/user-input.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  pokemonCard;

  constructor(
    private pokemonApi: PokemonApiService,
    private route: ActivatedRoute,
    private logEmitter: LogScreenService,
    private inputService: UserInputService,
    private router: Router
  ) {
    this.pokemonCard = {
      name: '',
      id: null,
      weight: null,
      height: null,
      types: '',
      sprite: '',
      description: ''
    };
    this.inputService.returnButton = new Subject();
    this.inputService.returnButton.subscribe((click: boolean) => {
     if (click === true){
      this.router.navigate(['/pokemons/']);
     }
    });
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const pokemonId = +params['id'];
      this.pokemonApi.getPokemonCard(pokemonId).subscribe((pokemon: any) => {
        if (typeof pokemon !== 'undefined') {
          this.pokemonCard.height = pokemon.height;
          this.pokemonCard.weight = pokemon.weight;
          this.pokemonCard.id = pokemon.id;
          this.pokemonCard.name = pokemon.name;
          this.pokemonCard.types = this.returnStringTypes(pokemon.types);
          this.pokemonCard.sprite = pokemon.sprites.front_default;
          this.pokemonCard.description = '';
      }});
      this.pokemonApi.getPokemonDescription(pokemonId).subscribe((pokemon: any) => {
        if (typeof pokemon !== 'undefined') {
          this.pokemonCard.description = this.readDescription(pokemon);
          this.logEmitter.logListener.next(this.pokemonCard.description);
        }
      });
    });
  }
  readDescription(jsonSpecies: any) {
    let description = 'This Pokemon does not have a description.';
    const jsonFields = Object.keys(jsonSpecies);
    const found = jsonFields.find((element) => element === 'flavor_text_entries');
    if(typeof found !== 'undefined') {
      jsonSpecies.flavor_text_entries.forEach((mensage) => {
        if(mensage.language.name === 'en'){
          description = mensage.flavor_text;
        }
      })
    }
    return description;
  }
  returnStringTypes(types: any){
    let str ='';
    types.forEach(type => {
      str += (type.type.name + ',');
    })
    return str.replace(/,([^,]*)$/, ' ');
  }
  ngOnDestroy() {
    this.inputService.returnButton.unsubscribe();
  }
}
