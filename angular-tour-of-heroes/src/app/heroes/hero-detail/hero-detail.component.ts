import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // @Input() hero!: Hero;
  hero!: Hero;
  txtGoBack = 'go back';
  txtSave = 'Save';
  constructor(private heroService: HeroService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.heroService.getHero(id).subscribe(resp => this.hero = resp!);
  }

  goBack() {
    this.location.back();
  }

  save() {
    console.log('Saving...');
    this.heroService.updateHero(this.hero);
  }

}
