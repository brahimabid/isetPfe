import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfGuard implements CanActivate {
  constructor(private  auth:AuthService,private router:Router){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            if( this.auth.currentUser().role==1 && this.auth.islogged() )
            {return true;}
            else
          {

              this.router.navigate(["/auth/login"])
              return  false
          }

   
  }
  
}
