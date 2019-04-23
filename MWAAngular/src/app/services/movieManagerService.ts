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
}