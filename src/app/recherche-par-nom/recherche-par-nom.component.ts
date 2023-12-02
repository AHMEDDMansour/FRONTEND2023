import { Component, OnInit } from '@angular/core';
import { Sport } from '../model/sport.model';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {

  nomSport! : string ; 
  sports! : Sport[];
  allSports! : Sport[];
  searchTerm! : string;
  
  constructor(private sportService : SportService) { }

  ngOnInit(): void {
    this.sportService.listeSports().subscribe(spt => {
      console.log(spt);
      this.sports = spt;
      });
  }

  onKeyUp(filterText : string){
    this.sports = this.allSports.filter(item =>
    item.nomSport.toLowerCase().includes(filterText));
    }




  rechercherSpts(){
    this.sportService.rechercherParNom(this.nomSport).subscribe(spts => {this.sports = spts;
    console.log(spts)});
    }


}
