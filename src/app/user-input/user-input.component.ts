import { Component, OnInit } from '@angular/core';
import { UserInputService } from '../main-screen/shared/user-input.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit {

  constructor(
    private inputService: UserInputService,
    private route: Router
  ) {

  }

  ngOnInit() {
  }
  returnFunction() {
    if (this.route.url !== '/pokemons') {
        this.inputService.returnButton.next(true);
    }
  }
  enterFunction() {
    if (this.route.url === '/pokemons') {
      this.inputService.enterButton.next(true);
    }
  }
}
