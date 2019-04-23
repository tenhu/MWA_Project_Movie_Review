import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { GetMovieService } from '../services/get-movie.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { authStore } from '../auth/auth-store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  rateUs = false;

  userinfo;

  current_userTest = "youserrr";
  mymovie;
  showCinema = false
  myform: FormGroup;

  newvote: boolean = true;


  movie_id;
  movie_title;
  movie_desc;
  movie_dire;
  movie_type;
  movie_image;
  movie_release;
  movie_views = 0;
  movie_comments;
  movie_cinemas;
  rateStar = 0;

  currentUserReview;


  movie_AvgRate: number = 0;



  constructor(private movie: GetMovieService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.myform = this.fb.group({
      'comment1': ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.myform.valid) {
      console.log(this.myform.controls['comment1'].value)
      console.log(this.newvote)
      if (this.newvote) {
        this.movie.reviewUpdate(this.movie_id, this.current_userTest, this.rateStar, this.myform.controls['comment1'].value, 2).then(data => console.log(data));

        this.movie_comments.push({ userName: this.current_userTest, rate: this.rateStar, comment: this.myform.controls['comment1'].value })

      }
      else {
        this.movie.reviewUpdate(this.movie_id, this.current_userTest, this.rateStar, this.myform.controls['comment1'].value, 1).then(data => console.log(data));
        this.movie_comments = this.movie_comments.filter(comment => comment.userName !== this.current_userTest);

        this.movie_comments.push({ userName: this.current_userTest, rate: this.rateStar, comment: this.myform.controls['comment1'].value })

      }
    }
  }


  cinemaShow(e: Event) {
    this.showCinema = true;
  }


  hideCenima(e: Event) {
    this.showCinema = false;
  }


  ngOnInit() {

    this.userinfo = authStore.getState().userinfo;
    if(!this.userinfo.username) {
      console.log('not logged in');
      this.router.navigate(['/login']);

    } 


    this.current_userTest = this.userinfo.username;
    console.log('[part:] '+ this.userinfo.username);

    this.route.params.subscribe(params => this.movie_id = params['id'])
    console.log(this.movie_id)
    this.movie.getMovieData(this.movie_id).then(movie => {
      console.log('[inside]' + JSON.stringify(movie));
      this.mymovie = JSON.parse(JSON.stringify(movie));

      this.movie_title = this.mymovie[0].title;
      this.movie_desc = this.mymovie[0].descripton;
      this.movie_dire = this.mymovie[0].director;
      this.movie_image = this.mymovie[0].imageUrl;
      this.movie_type = this.mymovie[0].type;
      this.movie_release = this.mymovie[0].released;
      this.movie_cinemas = this.mymovie[0].cinema.cinemas;

      if (this.mymovie[0].review.reviews.length > 0) {

        this.movie_views = this.mymovie[0].review.reviews.length
        var totalrates = this.mymovie[0].review.reviews.reduce(function (accumulator, view) {
          return accumulator + view.rate;
        }, 0);
        this.movie_AvgRate = Math.round(totalrates / this.movie_views * 10) / 10;
        console.log(this.movie_AvgRate);

        this.movie_comments = this.mymovie[0].review.reviews;

        console.log(this.movie_comments);
        console.log(this.current_userTest);

        var currReview = this.mymovie[0].review.reviews.filter(review => review.userName === this.current_userTest);
        console.log(currReview)
        if (currReview.length !== 0) {
          this.newvote = false;

          this.currentUserReview = currReview[0];
          console.log(this.currentUserReview);

          this.myform.controls['comment1'].setValue(this.currentUserReview.comment)
          this.rateStar = this.currentUserReview.rate
          console.log(this.rateStar);
        }
        else {
          this.newvote = true;
        }


      }



    });


  }

  parentHandleClick(e) {
    this.rateStar = e;
    console.log(e)
    if (this.newvote) {
      this.movie.reviewUpdate(this.movie_id, this.current_userTest, this.rateStar, "", 2).then(data => console.log(data));
    }
    else {

      this.movie.reviewUpdate(this.movie_id, this.current_userTest, this.rateStar, this.currentUserReview.comment, 1).then(data => console.log(data));

    }


  }



}
