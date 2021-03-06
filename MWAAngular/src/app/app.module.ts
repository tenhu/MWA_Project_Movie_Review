import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { HeaderComponent } from './header/header.component';
import { MovieAdminComponent, ManageMovieFormComponent } from './movie-admin/movie-admin.component';
import { GetMovieService } from './services/get-movie.service';
import { MovieDetailsComponent } from './review/movie-details.component';
import { JWTCanActivate } from './auth/jwt-can-activate';
import { ErrorService } from './services/errorService';
import { ErrorComponent } from './error/error.component';
import { JwtDirective } from './auth/jwt.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModules } from './material-modules';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



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
    HeaderComponent,MovieDetailsComponent,
    SignUpComponent,
    HeaderComponent,
    MovieAdminComponent,
    ErrorComponent,
    JwtDirective,
    ManageMovieFormComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [ManageMovieFormComponent, ConfirmDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtConfig,
    MaterialModules
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:ApiUrlInterceptor, multi:true},
    Configurations,
    LoginService,GetMovieService,
    LoginService,
    JWTCanActivate,
    ErrorService    ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
