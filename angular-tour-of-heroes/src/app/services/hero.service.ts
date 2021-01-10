import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Hero } from '../models/hero';
import { HEROES } from '../data/mock-heroes';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })

export class HeroService {
  message: string = 'HeroService: fetched heroes';
  messageHero: string = 'HeroService: feteched hero id =';

  private heroesUrl = 'api/heroes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private messageSerice: MessageService) {

  }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.log(this.message);
    /*This simply return observable through rxjs and return in of() method*/
    // return of(HEROES); 
    /*We are using im memory database api so we need to call httpclient */
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log(this.message)),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero | undefined> {
    // TODO: send the message _after_ fetching the hero
    this.log(this.messageHero + id);
    /*This simply return observable through rxjs and return in of() method*/
    // return of(HEROES.find(hero => hero.id === id));
    /*We are using im memory database api so we need to call httpclient */
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
          .pipe(
            tap(_ => this.log(`${this.messageHero} ${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
          );
  }


  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
            .pipe(
              tap(_ => this.log(`Updated hero id = ${hero.id}`)),
              catchError(this.handleError<any>('UpdateHero'))
            );
    
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageSerice.add(message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
