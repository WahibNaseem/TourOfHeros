import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr nice' },
      { id: 12, name: 'Dr Allama Iqbal' },
      { id: 12, name: 'Quaid-e-Azam' },
      { id: 13, name: 'Imran khan' },
      { id: 14, name: 'Captain ShairGul' },
      { id: 15, name: 'Dr Azhari' },
      { id: 16, name: 'Mr Anas' },
      { id: 17, name: 'Captain Jacky' },
      { id: 18, name: 'Phd Marwan' },
      { id: 19, name: 'Engineer Luthfi' },
      { id: 20, name: 'Dr Sohaib' }

    ];

    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;   
  }
  constructor() { }
}
