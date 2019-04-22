import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  {path:'login', component:LoginFormComponent},
  {path:'logout', component:LogoutComponent},
  {path:'movie', component: MovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
