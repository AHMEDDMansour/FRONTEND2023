import { Image } from './../model/Image.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { Sport } from '../model/sport.model';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-update-sport',
  templateUrl: './update-sport.component.html',
  styles: [
  ]
})
export class UpdateSportComponent implements OnInit {
  currentSport = new Sport();
  genres!: Genre[];
  updatedGnId!: number;
  myImage! : string;
  uploadedImage!: File; isImageUpdated: Boolean=false;
  constructor(private activatedRoute: ActivatedRoute, private sportService: SportService, private router: Router) { }

  ngOnInit(): void {
    this.sportService.listeGenres().
    //subscribe(gn => {console.log(gn);
    //this.genres = gn._embedded.genres;
    subscribe(gn =>{this.genres = gn._embedded.genres;
    console.log(gn);
  });
    
    
    this.sportService.consulterSport(this.activatedRoute.snapshot.params['id']).
    subscribe( spt =>{ this.currentSport = spt;
    this.updatedGnId = this.currentSport.genre.idG;
    this.sportService.loadImage(this.currentSport.image.idImage)
    .subscribe((img: Image)=>{
      this.myImage = 'data:'+ img.type + ';base64,'+ img.image;
    });
    } ) ;
    }


  updateSport() {
    this.currentSport.genre = this.genres.
      find(gn => gn.idG == this.updatedGnId)!;
      if (this.isImageUpdated) {
         this.sportService
         .uploadImage(this.uploadedImage, this.uploadedImage.name) .subscribe((img: Image) => { this.currentSport.image = img;
    this.sportService.updateSport(this.currentSport).subscribe(spt => {
      this.router.navigate(['sports']);
    }
    );

  });
      }
    else {
      this.sportService.updateSport(this.currentSport).subscribe((spt) => {
        this.router.navigate(['sports']);
    });
  }
}
  

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
       this.uploadedImage = event.target.files[0];
        this.isImageUpdated =true; 
        const reader = new FileReader(); 
        reader.readAsDataURL(this.uploadedImage); 
        reader.onload = () => { this.myImage = reader.result as string; }; }
       }



}
