import { Component, OnInit } from '@angular/core';
import { MovieManagerService } from '../services/movieManagerService';

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
      this.list(this.options={p:1});
  }

  list(options){
    this.service.list(this.options={p:1})
    .then((result:any) => {
      this.movies = result;
    });
  }

  onPaging(page:number){
      this.options=Object.assign({}, this.options,{p:page});
      this.list(this.options);
  }

  onSearch(q:string){        
      this.options=Object.assign({},this.options,{p:1,q:q});
      this.list(this.options);
  }

}
