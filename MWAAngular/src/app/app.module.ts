import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MovieComponent } from './movie/movie.component';
import { ReviewComponent } from './review/review.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginStatusComponent } from './login-status/login-status.component';
import { LogoutComponent } from './logout/logout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiUrlInterceptor } from './commons/api-interceptor';
import { JwtConfig } from './auth/auth-jwt';
import { LoginService } from './services/loginService';
import { Configurations } from './commons/configurations';
import { MovieAddEditComponent } from './movie/movie-add-edit/movie-add-edit.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MovieComponent,
    ReviewComponent,
    LoginFormComponent,
    LoginStatusComponent,
    LogoutComponent,
    MovieAddEditComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtConfig
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:ApiUrlInterceptor, multi:true},
    Configurations,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
