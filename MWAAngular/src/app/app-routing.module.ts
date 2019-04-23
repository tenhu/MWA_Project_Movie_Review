import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { MovieComponent } from './movie/movie.component';
<<<<<<< HEAD
import { ReviewComponent } from './review/review.component';
import { MovieDetailsComponent } from './review/movie-details.component';
=======
import { SignUpComponent } from './sign-up/sign-up.component';
import { MovieAdminComponent } from './movie-admin/movie-admin.component';
import { JWTCanActivate } from './auth/jwt-can-activate';
import { ErrorComponent } from './error/error.component';
>>>>>>> a681903100f690750c039b70f0937edbc9cf7cfc

const routes: Routes = [
  {path:'error', component:ErrorComponent},
  {path:'login', component:LoginFormComponent},
  {path:'logout', component:LogoutComponent},
  {path:'movie', component: MovieComponent},
<<<<<<< HEAD
  {path:'movie/get/:id', component: MovieDetailsComponent}
=======
  {path:'admin', children:[{
    path:'movie', component:MovieAdminComponent, data:{roles:'admin'}, canActivate:[JWTCanActivate]
  }]},
  {path:'signup', component: SignUpComponent},
  {path:'', redirectTo: 'movie', pathMatch: 'full' },
  {path:'**', redirectTo: 'movie' }
>>>>>>> a681903100f690750c039b70f0937edbc9cf7cfc
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
