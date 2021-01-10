import { Injectable } from '@angular/core';

import { Observable , of} from 'rxjs';

import { Hero } from '../models/hero';
import { HEROES } from '../data/mock-heroes';
import { MessageService } from './message.service';

@Injectable({providedIn: 'root'})

export class HeroService {
  message: string = 'HeroService: fetched heroes';
  messageHero: string = 'HeroService: feteched hero id =';

  constructor(private messageSerice: MessageService) {
    
   }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageSerice.add(this.message);
    return of(HEROES);
  }

  getHero(id:number): Observable< Hero |undefined> {
     // TODO: send the message _after_ fetching the hero
    this.messageSerice.add(this.messageHero + id);
    return of(HEROES.find(hero => hero.id === id));
  }
}
