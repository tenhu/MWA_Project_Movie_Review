import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authStore } from '../auth/auth-store';

@Injectable()
export class JWTCanActivate{
    constructor(private router:Router, ){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let roles = (route.data["roles"]) ? route.data["roles"] : null;        
        if(authStore.getState().userinfo.userid>''){
            if(roles==null || roles.length ==0){
                return true;
            }

            let granted = false;
            authStore.getState().userinfo.roles.forEach(r=>{
                if(!granted){
                    if(roles == r || roles.indexOf(r)>=0){
                        granted = true;
                    }
                }
            });
            if(!granted){
                this.router.navigate(['/access-denied']);                    
            }
            return granted;
        }else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});        
            return false;
        }
      }
    
}