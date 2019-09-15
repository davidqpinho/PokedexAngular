import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogScreenService } from '../main-screen/shared/log-screen.service';

@Component({
  selector: 'app-pokedex-log',
  templateUrl: './pokedex-log.component.html',
  styleUrls: ['./pokedex-log.component.scss']
})

export class PokedexLogComponent implements OnInit, OnDestroy {

  description: string;
  logScreen;

  constructor( private logEmitter: LogScreenService ) {
    this.logEmitter.logListener.subscribe((message: string) => {
    this.logScreenWriter(message);
    });
  }

  logScreenWriter(message: string) {
    const dLength = message.length;
    this.description = '';
    let count = 0;
    this.logScreen = setInterval(() => {
      if (count >= dLength) {
        clearInterval(this.logScreen);
      } else {
        this.description += message[count];
        count++;
      }
    }, 10);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    clearInterval(this.logScreen);
  }
}
