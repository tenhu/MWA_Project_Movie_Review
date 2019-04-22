import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { 
  }

  addMovie(title: string, released: string, imageUrl: string, director:string ){
    return this.http.post('http://localhost:3000/movie',{
      "title": title,
      "released": released,
      "imageUrl": imageUrl,
      "director": director
    }).toPromise(); 
  }  

  getMovies() {
    return this.http.get('http://localhost:3000/movie').toPromise();
  }   

}
