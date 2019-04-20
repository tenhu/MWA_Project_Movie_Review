import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Store } from 'redux';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authStore:Store){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
            headers:req.headers.set('Authorization',`Bearer ${this.authStore.getState().jwt}`)});
        return next.handle(authReq);
    }
}