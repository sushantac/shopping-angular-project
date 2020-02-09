import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean;
}

@Injectable()
export class AuthEffects {

    private apiKey: string = environment.firbaseAPIKey;
    private authUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.apiKey;
    private loginUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.apiKey;

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            
            return this.http.post<AuthResponseData>(
                this.loginUrl, {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                map(resData => {
                    // Here also, return non-error observable

                    const expirationDate: Date = new Date( new Date().getTime() + +resData.expiresIn * 1000);
                    return new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    });

                }),
                catchError( errorResponse => {
                    let erroMessage = "An unknown error occured!";
                    if(!errorResponse.error && !errorResponse.error.error){
                        return of(new AuthActions.LoginFailed(erroMessage));
                    }

                    switch(errorResponse.error.error.message){
                        case 'EMAIL_EXISTS':
                            erroMessage = "Email already exists!";
                            break;
                        case 'INVALID_EMAIL':
                            erroMessage = "Invalid email provided!";
                            break;
                        case 'EMAIL_NOT_FOUND':
                            erroMessage = "Email or password is not correct!";
                            break;
                    }

                    return of(new AuthActions.LoginFailed(erroMessage));

                }), 
            )
        })

    );


    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/']);
        })
    )
   
    constructor(private actions$: Actions, private http: HttpClient, private router: Router){}

}