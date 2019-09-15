import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInputService } from '../main-screen/shared/user-input.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private inputService: UserInputService
  ) {
    this.inputService.returnButton = new Subject();
    this.inputService.returnButton.subscribe((click: boolean) => {
     if (click === true) {
      this.router.navigate(['/pokemons/']);
     }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.inputService.returnButton.unsubscribe();
  }

}
