import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/loginService';
import { authStore } from '../auth/auth-store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthActions } from '../auth/auth-actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  myform:FormGroup;
  constructor(private fb:FormBuilder, private loginService:LoginService,private jwtHelper: JwtHelperService) {
    this.myform = this.fb.group({
      'username':['',Validators.required],
      'password':['',Validators.required]
    });        
  }

  onLogin ():void {
    if(this.myform.valid){
      this.loginService.doLogin(
        this.myform.controls['username'].value,
        this.myform.controls['password'].value)
      .then((res:any)=>{
        let userinfo = res.userinfo;
        userinfo.jwt = res.jwt;
        authStore.dispatch(AuthActions.login(userinfo));
      });
    }
  }

  ngOnInit() {
  }

}
