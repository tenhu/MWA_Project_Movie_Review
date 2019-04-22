import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    constructor(private http:HttpClient){}

    doLogin(username:string, password:string):Promise<any>{
        return this.http.post('<api>login',{username:username, password:password})
        .toPromise();
    }
}