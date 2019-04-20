import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  myform:FormGroup;
  constructor(private fb:FormBuilder) {
    this.myform = this.fb.group({
      'username':['',Validators.required],
      'password':['',Validators.required]
    });        
  }

  onLogin ():void {
    
  }

  ngOnInit() {
  }

}
