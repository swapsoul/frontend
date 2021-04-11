import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private _router:Router, public globalService: GlobalService ) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
 
        //check some condition  
        if (!this.globalService.profileFlag)  {
            alert('Please login to view this page');
            this._router.navigate(['home']);
            //redirect to login/home page etc
            //return false to cancel the navigation
            return false;
        } 
        return true;
    }
 
}