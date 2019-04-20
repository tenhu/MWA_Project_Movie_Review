import { Component, OnInit } from '@angular/core';
import { authStore } from '../auth/auth-store';
import { AuthActions } from '../auth/auth-actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    authStore.dispatch(AuthActions.logout());
  }

}
