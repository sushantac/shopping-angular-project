import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean;
}

@Injectable({providedIn: "root"})
export class AuthService{

    userSubject:BehaviorSubject<User> = new BehaviorSubject<User>(null);

    private apiKey: string = "AIzaSyDt9-fXr-WhcifLa36g0HB7wzi_wsC-V_s";
    private authUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.apiKey;
    private loginUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.apiKey;

    constructor(private http: HttpClient){}


    login(email: string, password: string){
        return this.http.post<AuthResponseData>(this.loginUrl, 
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
        ).pipe(catchError(this.handleError), tap(this.handleAuthentication.bind(this)));


    }

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(this.authUrl, 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(this.handleAuthentication));
    }


    private handleAuthentication(response: AuthResponseData){
        console.log(response);
        const expirationDate: Date = new Date( new Date().getTime() + +response.expiresIn * 1000);
        const user: User = new User(response.email, response.localId, response.idToken, expirationDate);

        this.userSubject.next(user);
    
    }
    private handleError( errorResponse: HttpErrorResponse){
        console.log(errorResponse);

        let erroMessage = "An unknown error occured!";
        if(!errorResponse.error && !errorResponse.error.error){
            return throwError(erroMessage);
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

        return throwError(erroMessage);
  
    }
}