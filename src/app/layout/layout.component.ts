import { Component, OnInit } from '@angular/core';
import { AnimationService } from '../main-screen/shared/animation.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [
    './layout.component.scss',
    './cover.component.scss',
    './hinge.component.scss',
    './leds.component.scss',
    './miscellaneous.component.scss',
    './screen-place.component.scss'
  ]
})

export class LayoutComponent implements OnInit {
  blinkPokemonCard: boolean;
  blinkPokemonList: boolean;

  constructor(
    private animationService: AnimationService
  ) {
    this.blinkPokemonCard = false;
    this.blinkPokemonList = false;
    this.animationService.pokemonCard.subscribe(() => {
      this.blinkPokemonCard = true;
      setTimeout(() => { this.blinkPokemonCard = false; }, 1000);
    });
    this.animationService.pokemonList.subscribe(() => {
      this.blinkPokemonList = true;
      setTimeout(() => { this.blinkPokemonList = false; }, 1500);
    });
  }

  ngOnInit() {
  }
}
