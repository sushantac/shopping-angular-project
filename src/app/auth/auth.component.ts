import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{

  errorMessage: string;
  successMessage: string;

  isLoading: boolean;

  signUpInfo: {email: string, password: string};

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private componentFactoryResolver: ComponentFactoryResolver) { 

  }

  ngOnInit() {

  }

  login(loginForm:NgForm){
    if(!loginForm.valid){
      return;
    }
    this.successMessage = null;
    this.errorMessage = null;
    this.isLoading = true;

    this.signUpInfo = loginForm.value;

    this.authService.login(this.signUpInfo.email, this.signUpInfo.password)
    .subscribe(response => {
        this.isLoading = false;

        this.router.navigate(['/recipes']);
      }, errorMessage => {
        this.errorMessage = errorMessage;

        this.showErrorAlert(errorMessage);
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


  @ViewChild('place', {static: true, read: ViewContainerRef}) alertHost: ViewContainerRef;
  private closeSub: Subscription;
  showErrorAlert(errorMsg: string ){
    
    console.log(this.alertHost);
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostContainerRef = this.alertHost;

    hostContainerRef.clear();
    let alertBoxInstance = hostContainerRef.createComponent(alertComponentFactory).instance;
    alertBoxInstance.message = this.errorMessage;
    this.closeSub = alertBoxInstance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostContainerRef.clear();
    });

  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
