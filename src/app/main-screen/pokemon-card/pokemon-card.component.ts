import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonApiService } from '../shared/pokemon-api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LogScreenService } from '../shared/log-screen.service';
import { UserInputService } from '../shared/user-input.service';
import { Subject } from 'rxjs';
import { AnimationService } from '../shared/animation.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  descriptionArray = [];
  pokemonCard;
  sprites;
  spritePosition: number;
  public logSender = new Subject();

  constructor(
    private pokemonApi: PokemonApiService,
    private route: ActivatedRoute,
    private logEmitter: LogScreenService,
    private inputService: UserInputService,
    private router: Router,
    private animationService: AnimationService
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
    this.spritePosition = 0;
    this.sprites = [ 'front_default'];
    /* Constructor Observables */
    this.inputService.returnButton = new Subject();
    this.inputService.returnButton.subscribe((click: boolean) => {
     if (click === true) {
      this.router.navigate(['/pokemons/']);
     }
    });
    this.inputService.leftRigthButtons = new Subject();
    this.inputService.leftRigthButtons.subscribe((arrowButton: string) => {
      if (this.pokemonCard.id !== null) {
        if (arrowButton === 'left' && this.pokemonCard.id > 1) {
          this.router.navigate(['/pokemons/' + String(this.pokemonCard.id - 1)]);
         }
         if (arrowButton === 'right') {
          this.router.navigate(['/pokemons/' + String(this.pokemonCard.id + 1)]);
         }
      }
     });
     this.inputService.upDownButtons = new Subject();
     this.inputService.upDownButtons.subscribe((arrowButton: string) => {

      if (this.pokemonCard.id !== null) {

        if (arrowButton === 'up') {
          this.spritePosition = (this.spritePosition >= this.sprites.length-1) ?
          0 : this.spritePosition + 1;
        }
        if (arrowButton === 'down') {
          this.spritePosition = (this.spritePosition < 1) ?
          this.sprites.length - 1 : this.spritePosition - 1 ;
        }
      }
     });
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const pokemonId = params['id'];
      this.pokemonApi.getPokemonCard(pokemonId).subscribe((pokemon: any) => {
        if (typeof pokemon !== 'undefined') {
          this.pokemonCard.height = pokemon.height;
          this.pokemonCard.weight = pokemon.weight;
          this.pokemonCard.id = pokemon.id;
          this.pokemonCard.name = pokemon.name;
          this.pokemonCard.types = this.returnStringTypes(pokemon.types);
          this.pokemonCard.sprite = pokemon.sprites;
          this.pokemonCard.description = '';
          setTimeout(() => {this.animationService.pokemonCard.next(true); }, 200);
          this.buildSpritesArray();
      }});
      this.pokemonApi.getPokemonDescription(pokemonId).subscribe((pokemon: any) => {
        if (typeof pokemon !== 'undefined') {
          this.pokemonCard.description = this.readDescription(pokemon);
          this.logEmitter.logListener.next(this.pokemonCard.description);
        }
      });
    });
    this.inputService.languageKeyboard = new Subject();
    this.inputService.languageKeyboard.subscribe((language: string) => {
     this.descriptionArray.every((element) => {
       if (element.language === language) {
         this.logEmitter.logListener.next(element.description);
         return false;
       } else {
         return true;
       }
     });
    });
  }
  readDescription(jsonSpecies: any) {
    let description = 'This Pokemon does not have a description.';
    const jsonFields = Object.keys(jsonSpecies);
    const found = jsonFields.find((element) => element === 'flavor_text_entries');
    if (typeof found !== 'undefined') {
      this.descriptionArray = [];
      jsonSpecies.flavor_text_entries.forEach((mensage) => {
        this.descriptionArray.push({
          language: mensage.language.name,
          description: mensage.flavor_text
        });
        if (mensage.language.name === 'en') {
          description = mensage.flavor_text;
        }
      });
    }
    return description;
  }
  returnStringTypes(types: any) {
    let str = '';
    types.forEach(type => {
      str += (type.type.name + ',');
    });
    return str.replace(/,([^,]*)$/, ' ');
  }
  ngOnDestroy() {
    this.inputService.returnButton.unsubscribe();
    this.inputService.leftRigthButtons.unsubscribe();
    this.inputService.upDownButtons.unsubscribe();
  }
  buildSpritesArray() {
    this.sprites = [];
    for (const key in this.pokemonCard.sprite) {
      if (this.pokemonCard.sprite[key] !== null) {
        this.sprites.push(key);
      }
    }
    this.spritePosition = this.sprites.indexOf('front_default');
  }
}
