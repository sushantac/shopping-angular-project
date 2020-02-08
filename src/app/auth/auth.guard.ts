import { CanActivate, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){

    }
   
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.store.select('auth').pipe(
            map(authState => {
                return authState.user;
            }),
            take(1),
            map(user => {

                const isAuth = !!user;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/login']);
            })
        );
    }

}