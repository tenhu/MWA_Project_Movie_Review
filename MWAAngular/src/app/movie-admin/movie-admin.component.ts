import { Component, OnInit } from '@angular/core';
import { MovieManagerService } from '../services/movieManagerService';
import { PageEvent } from '@angular/material';
import { toTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-movie-admin',
  templateUrl: './movie-admin.component.html',
  styleUrls: ['./movie-admin.component.css']
})
export class MovieAdminComponent implements OnInit {

  constructor(private service:MovieManagerService) { }

  private options;
  movies:{};
  ngOnInit(): void {
      this.list({p:1});
  }

  list(options){
    this.options = options;
    this.service.list(this.options={p:1})
    .then((result:any) => {
      this.movies = result;
    }).catch((err)=>{
      this.movies={};
    });
  }

  onPaging(page:PageEvent){
      this.list(Object.assign({}, this.options,{p:page.pageIndex}));
  }

  onSearch(q:string){        
      this.list(Object.assign({},this.options,{p:1,q:q}));
  }
}
