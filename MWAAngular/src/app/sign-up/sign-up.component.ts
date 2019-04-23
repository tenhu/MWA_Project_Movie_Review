import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/loginService';
import { MatchingValidator } from '../validators/match-validator';
import { UsernameValidators } from '../validators/validate-username';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  myform:FormGroup;
  signupsucceeded = false;
  errors:[];
  constructor(private fb:FormBuilder, private loginService:LoginService) {
    this.myform = this.fb.group({
      'username':['',[Validators.required,Validators.minLength(3)],
                  UsernameValidators.unique(loginService)],
      'password':['',[Validators.required,Validators.minLength(6),MatchingValidator.create()]],
      'confirmpwd':['',MatchingValidator.create()],
      'name':['',Validators.required]
    });         
   }
   hasError(field, rule){
    return this.myform.get(field).hasError(rule)
          && this.myform.get(field).touched
  }
  ngOnInit() {
  }

  onSignup ():void {
    if(this.myform.valid){
      this.loginService.doSignup({
        username:this.myform.controls['username'].value,
        password:this.myform.controls['password'].value,
        name:this.myform.controls['name'].value})
      .then((res:any)=>{
        if(res.succeeded){
          this.errors = [];
          this.signupsucceeded=true;
        }else{
          this.errors = res.error;
        }
      });
    }
  }

}
