import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  errorMessage: string;
  successMessage: string;

  isLoading: boolean;

  signUpInfo: {email: string, password: string};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  login(loginForm:NgForm){
    if(!loginForm.valid){
      return;
    }
    this.successMessage = null;
    this.errorMessage = null;
    this.isLoading = true;

    console.log(loginForm.value);

    this.signUpInfo = loginForm.value;

    this.authService.login(this.signUpInfo.email, this.signUpInfo.password)
    .subscribe(response => {
        this.isLoading = false;

        this.router.navigate(['/recipes']);
      }, errorMessage => {

        this.errorMessage = errorMessage;
        this.isLoading = false;
      }
    );
    
    
  }
  onSignUp(loginForm:NgForm){
      if(!loginForm.valid){
        return;
      }
      this.successMessage = null;
      this.errorMessage = null;
      this.isLoading = true;

      this.signUpInfo = loginForm.value;
      this.authService.signUp(this.signUpInfo.email, this.signUpInfo.password).subscribe(response => {
        
        this.successMessage = "User signed up successfully! Now you can login!";
        
        this.isLoading = false;
      }, errorMessage =>{
        this.errorMessage = errorMessage;
        this.isLoading = false;
      })
  }

  onHandleError(){
    this.errorMessage = null;
  }

}
