import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AnimationService {

  public pokemonCard = new Subject();
  public pokemonList = new Subject();

  constructor() { }
}
