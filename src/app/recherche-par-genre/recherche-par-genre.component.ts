import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { Sport } from '../model/sport.model';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styles: [
  ]
})
export class RechercheParGenreComponent implements OnInit {
  sports! : Sport[];
  IdGenre! : number ;
  genres! : Genre[];

  
  constructor(private sportService : SportService) { }

  ngOnInit(): void {
    this.sportService.listeGenres().subscribe(gn => {this.genres = gn._embedded.genres;
    console.log(gn);
    });
  }

  onChange() {
    this.sportService.rechercherParGenre(this.IdGenre).
    subscribe(spts =>{this.sports=spts});
    }

}
