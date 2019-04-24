import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetMovieService {
  getMovieData(id:string){
   return this.http.get("<api>movie/"+id).toPromise();
    
  
    }
 
    reviewUpdate(id: string, username: string, rate: number, comment:string ,index:number ){
      return this.http.patch('<api>review'+"/"+id,{
        "index":index,
        "userName": username,
        "rate": rate,
        "comment": comment,
      }).toPromise(); 
    }  
 

  constructor(private http:HttpClient) { }
}