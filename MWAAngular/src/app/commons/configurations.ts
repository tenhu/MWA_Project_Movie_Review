import { Injectable } from "@angular/core";

@Injectable()
export class Configurations{
    baseApiUrl = ''
    constructor(){
        window.document.getElementsByName('apibase').forEach((el) =>{
            el.getAttribute("href");
        })

    }    
}