import { Component, OnInit, OnChanges } from '@angular/core';
import { GetMovieService } from '../services/get-movie.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit,OnChanges {
  current_userTest = "gemMan";
mymovie;
showCinema = false
myform:FormGroup;

movie_id;
movie_title;
movie_desc;
movie_dire;
movie_type;
movie_image;
movie_release;
movie_views=0;
movie_comments;
movie_cinemas;
rateStar = 0;

currentUserReview;


movie_AvgRate:number = 0;



  constructor(private movie:GetMovieService,private route:ActivatedRoute,private fb:FormBuilder) { 
    this.myform = this.fb.group({
        'comment1':['',Validators.required],
      });    
  }

  onSubmit ():void {
    if(this.myform.valid){
console.log(this.myform.controls['comment1'].value)
this.movie.reviewUpdate(this.movie_id,this.current_userTest,5,this.myform.controls['comment1'].value,2).then(data=>console.log(data));

    }
    }
  cinemaShow(e:Event)
  {
    console.log(this.rateStar)
    this.showCinema = true;
  }
  hideCenima(e:Event)
  {
    this.showCinema = false;
  }


 
  ngOnInit() {
    this.route.params.subscribe(params=> this.movie_id = params['id'])
    console.log(this.movie_id)
    this.movie.getMovieData(this.movie_id).then(movie => {
        console.log('[inside]' + JSON.stringify (movie));
        this.mymovie = JSON.parse(JSON.stringify( movie));

    this.movie_title = this.mymovie[0].title;
    this.movie_desc = this.mymovie[0].descripton;
    this.movie_dire = this.mymovie[0].director;
    this.movie_image = this.mymovie[0].imageUrl;
    this.movie_type = this.mymovie[0].type;
    this.movie_release = this.mymovie[0].released;
    this.movie_cinemas = this.mymovie[0].cinema.cinemas;

    if(this.mymovie[0].review.reviews.length > 0 )
    {
    this.movie_views = this.mymovie[0].review.reviews.length
    var totalrates = this.mymovie[0].review.reviews.reduce(function (accumulator, view) {
        return accumulator + view.rate;
      }, 0);
      this.movie_comments = this.mymovie[0].review.reviews;
     
      var currReview = this.mymovie[0].review.reviews.filter(review=> review.userName === this.current_userTest); 
this.currentUserReview = currReview[0];
      console.log(this.currentUserReview);

      this.myform.controls['comment1'].setValue(this.currentUserReview.comment)
this.rateStar = this.currentUserReview.rate
console.log(this.rateStar);     
 this.movie_AvgRate = Math.round(totalrates/this.movie_views * 10) / 10;


}



       });    
     

  }
  ngOnChanges()
  {
      
  }

}
