import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  title = 'Honourable Names of Country Heroes';
  txtMessage = 'Heroes Component: Selected hero id = ';
 
  heroes! : Hero[];

  selectedHero!: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) {    
   }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero:Hero): void {
    this.selectedHero = hero; 
    this.messageService.add(this.txtMessage + hero.id);   
  }

  getHeroes(): void{
  this.heroService.getHeroes().subscribe(resp => this.heroes = resp);
  }

}
