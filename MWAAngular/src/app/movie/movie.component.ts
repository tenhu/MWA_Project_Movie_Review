import { Component, OnInit } from '@angular/core';

import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies;
  constructor(private movieService: MovieService) {

   }

  ngOnInit() {
    this.movieService.getMovies().then(movie => {
      //console.log('[inside]' + JSON.stringify (movie));
      this.movies = JSON.parse(JSON.stringify( movie));
     });
    //console.log('[Movies]' + this.movies);
  }



}
