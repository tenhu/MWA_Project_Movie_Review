import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { MovieComponent } from './movie/movie.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MovieAdminComponent } from './movie-admin/movie-admin.component';

const routes: Routes = [
  {path:'login', component:LoginFormComponent},
  {path:'logout', component:LogoutComponent},
  {path:'movie', component: MovieComponent},
  {path:'admin', children:[{
    path:'movie', component:MovieAdminComponent, data:{roles:'admin'}
  }]},
  {path:'signup', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
