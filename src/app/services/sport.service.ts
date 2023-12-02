import { Injectable } from '@angular/core';
import { Image } from '../model/Image.model';
import { Genre } from '../model/genre.model';
import { Sport } from '../model/sport.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/genreWrapped.model';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SportService {
  sports!: Sport[]; //un tableau de Sport
  apiURL: string = 'http://localhost:8080/sports/api';
  apiURLGN: string = 'http://localhost:8080/sports/gn';


  constructor(private http: HttpClient, private authService: AuthService) { }

  listeSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.apiURL+"/all");

  }

  ajouterSport(spt: Sport): Observable<Sport> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Sport>(this.apiURL, spt, { headers: httpHeaders });

  }

  supprimerSport(id: number) {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }


  consulterSport(id: number): Observable<Sport> {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Sport>(url, { headers: httpHeaders });
  }







  updateSport(spt: Sport): Observable<Sport> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Sport>(this.apiURL, spt, { headers: httpHeaders });

  }


  triersports() {
    this.sports = this.sports.sort((n1, n2) => {
      if (n1.idSport! > n2.idSport!) {
        return 1;
      }
      if (n1.idSport! < n2.idSport!) {
        return -1;
      }
      return 0;
    });
  }



  listeGenres(): Observable<GenreWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<GenreWrapper>(this.apiURLGN, { headers: httpHeaders });
  }



  rechercherParGenre(idG: number): Observable<Sport[]> {
    const url = `${this.apiURL}/sptgn/${idG}`;
    return this.http.get<Sport[]>(url);
  }


  rechercherParNom(nom: string): Observable<Sport[]> {
    const url = `${this.apiURL}/sptsByName/${nom}`;
    return this.http.get<Sport[]>(url);
  }


  ajouterGenre(gn: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiURLGN, gn, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image>{ 
    const imageFormData = new FormData(); 
    imageFormData.append('image', file, filename); 
    const url = `${this.apiURL + '/image/upload'}`; 
    return this.http.post<Image>(url, imageFormData); }
    
  loadImage(id: number): Observable<Image> { 
    const url = `${this.apiURL + '/image/get/info'}/${id}`; 
    return this.http.get<Image>(url); }
}
