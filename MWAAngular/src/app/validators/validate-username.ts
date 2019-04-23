import { Injectable } from '@angular/core';
import { LoginService } from '../services/loginService';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class UsernameValidators{
    static unique(loginService: LoginService) {
        return (control: AbstractControl) => {
                
            return new Promise((resolve,reject)=>{
                return loginService.checkUniqueUsername(control.value)
                .then(res => {
                    resolve(res.succeeded ? null : { used: true });
                }).catch((err)=>{reject("Failed to validate");});
            });
        };
      }
}