import { Component, OnInit } from '@angular/core';
import { Sport } from '../model/sport.model';
import { AuthService } from '../services/auth.service';
import { SportService } from '../services/sport.service';
import { Image } from '../model/Image.model';
@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
 
})
export class SportsComponent implements OnInit {

  sports? : Sport[];
  
  constructor( private sportService : SportService , public authService : AuthService) { }

  ngOnInit(): void {
    this.chargerSports();
  }




  chargerSports(){
    this.sportService.listeSports().subscribe(spt =>{
      
      this.sports = spt;

      this.sports.forEach((s)=> {
        this.sportService
        .loadImage(s.image.idImage)
        .subscribe((img: Image)=>{
          s.imageStr = 'data:'+ img.type + ';base64,' + img.image;
        });
      });
  
  
     });
  }

  supprimerSport(s: Sport)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.sportService.supprimerSport(s.idSport).subscribe(() => {
  console.log("sport supprimé");
  this.chargerSports();
  });
  }



}
