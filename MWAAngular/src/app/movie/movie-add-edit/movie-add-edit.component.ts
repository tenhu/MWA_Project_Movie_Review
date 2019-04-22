import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs";
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-movie-add-edit',
  templateUrl: './movie-add-edit.component.html',
  styleUrls: ['./movie-add-edit.component.css']
})
export class MovieAddEditComponent implements OnInit {

  movieForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private movieService: MovieService) {

    this.movieForm = formBuilder.group({
      'title': ['', Validators.required],
      'released': ['', Validators.required],
      'imageurl': ['', Validators.required],
      'director': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.movieForm.controls['title'].value);

    const title = this.movieForm.controls['title'].value;
    const released = this.movieForm.controls['released'].value;
    const imageurl = this.movieForm.controls['imageurl'].value;
    const director = this.movieForm.controls['director'].value;


    this.movieService.addMovie(title, released, imageurl, director).then(res => {
      console.log(res);
    }).catch(err=> {
      console.log(err);
    } );
    
  }

}
