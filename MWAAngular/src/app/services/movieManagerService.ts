import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MovieManagerService {

    constructor(private http:HttpClient){}


    list(options?){
        return this.http.get('<api>movie-manager',{params:options}).toPromise();
    }

    get(movieid){
        return this.http.get(`<api>movie-manager/${movieid}`).toPromise();
    }

    add(movie){
        return this.http.post('<api>movie-manager',movie).toPromise();
    }    
    
    update(id, movie){
        return this.http.put(`<api>movie-manager/${id}`,movie).toPromise();
    }   
    
    delete(id){
        return this.http.delete(`<api>movie-manager/${id}`).toPromise();
    }
}