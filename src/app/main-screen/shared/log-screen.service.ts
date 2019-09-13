import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LogScreenService {

  public logListener = new Subject();
  constructor() { }
}
