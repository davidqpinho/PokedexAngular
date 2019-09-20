import { Component, OnInit } from '@angular/core';
import { UserInputService } from '../main-screen/shared/user-input.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { PokemonApiService } from '../main-screen/shared/pokemon-api.service';


@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit {
  scrollPressed;
  pokemon;

  constructor(
    private inputService: UserInputService,
    private route: ActivatedRoute,
    private router: Router,
    private pokemonApi: PokemonApiService
  ) {

  }

  ngOnInit() {

  }

  searchPokemon() {
    this.router.navigate(['/pokemons/' + this.pokemon]);
    this.pokemon = null;
  }

  returnFunction() {
    if (this.router.url !== '/pokemons') {
        this.inputService.returnButton.next(true);
    }
  }

  enterFunction() {
    if (this.router.url === '/pokemons') {
      this.inputService.enterButton.next(true);
    }
  }

  arrowButtons(button, mouseposition) {
    if (mouseposition === 'mousedown') {
      const url = (this.router.routerState.snapshot.url).split('/');
      if ( ( url[url.length - 2]) === 'pokemons' ) {
        switch (button) {
          case 'left':
          case 'right':
              this.inputService.leftRigthButtons.next(button);
          break;
          case 'up':
          case 'down':
              this.inputService.upDownButtons.next(button);
          break;
        }
      }
    }
    if (this.router.url === '/pokemons') {
      if (mouseposition === 'mousedown') {
       this.scrollPressed = setInterval(() => {
          this.inputService.scrollButtom.next(button);
        }, 10);
      }
      if (mouseposition === 'mouseup') {
        clearInterval(this.scrollPressed);
      }
    }
  }
  languageSelector(language) {
    const url = (this.router.routerState.snapshot.url).split('/');
    if ( ( url[url.length - 2]) === 'pokemons' ) {
      this.inputService.languageKeyboard.next(language);
    }
  }
}
