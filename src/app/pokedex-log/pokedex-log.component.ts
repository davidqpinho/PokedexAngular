import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogScreenService } from '../main-screen/shared/log-screen.service';

@Component({
  selector: 'app-pokedex-log',
  templateUrl: './pokedex-log.component.html',
  styleUrls: ['./pokedex-log.component.scss']
})
export class PokedexLogComponent implements OnInit {
  description: string;
  constructor(
    private logEmitter: LogScreenService
  ) {
    this.logEmitter.logListener.subscribe((message: string) => {
      this.description = message;
    });
  }

  ngOnInit() {
  }
  OnDestroy() {
  }
}
