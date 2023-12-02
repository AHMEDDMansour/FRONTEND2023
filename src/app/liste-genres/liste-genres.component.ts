import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { AuthService } from '../services/auth.service';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
  styles: [
  ]
})
export class ListeGenresComponent implements OnInit {

  genres! : Genre[];
  ajout : boolean = true ; 
  updatedGn : Genre = {
    "idG": 0, "nomG": "", "descG": ""
  };

  constructor(private sportService : SportService , public authService : AuthService) { }

  ngOnInit(): void {
    this.sportService.listeGenres().subscribe(gns => {this.genres = gns._embedded.genres;
      console.log(gns);
    });
  }


  chargerGenres(){
    this.sportService.listeGenres().subscribe(gns => {this.genres = gns._embedded.genres;
    console.log(gns);
    });
    }



  genreUpdated(gn:Genre){
    console.log("gn updated event",gn);
    this.sportService.ajouterGenre(gn).subscribe( ()=> this.chargerGenres());
    }
    

    updateGn(gn:Genre) {
      this.updatedGn = gn ;
      this.ajout = false ;
     
      }
      





}
