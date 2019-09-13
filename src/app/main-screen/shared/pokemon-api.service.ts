import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IPokemonList } from './pokemon.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  FailedToLoad: boolean ;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getPokemonList(): Observable <IPokemonList> {
    this.FailedToLoad = false;
    return this.http.get<IPokemonList>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=300')
    .pipe(catchError(this.handleError<IPokemonList>('getPokemonList')));
  }
  getPokemonCard(id: number): Observable <any> {
    this.FailedToLoad = false;
    return this.http.get<IPokemonList>('https://pokeapi.co/api/v2/pokemon/' + id)
    .pipe(catchError(this.handleError<any>('getPokemonCard')));
  }
  getPokemonDescription(id: number): Observable <any> {
    this.FailedToLoad = false;
    return this.http.get<IPokemonList>('https://pokeapi.co/api/v2/pokemon-species/' + id)
    .pipe(catchError(this.handleDescriptionError<any>('getPokemonCard')));
  }
  private handleError <T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.router.navigate(['/404']);
      this.FailedToLoad = true;
      return of(result as T);
    };
  }
  private handleDescriptionError <T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}

