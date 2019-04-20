import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Configurations } from './configurations';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

    constructor(private config: Configurations){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const apireq = req.clone({url:this.config.baseApiUrl + req.url});
        return next.handle(apireq);
    }
}