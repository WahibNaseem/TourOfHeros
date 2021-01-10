import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs';
import { Hero } from '../models/hero';
import { HEROES } from '../data/mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  message: string = 'HeroService: fetched heroes';

  constructor(private messageSerice: MessageService) {
    
   }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageSerice.add(this.message);
    return of(HEROES);
  }
}
