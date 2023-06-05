import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.component";
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
  ReCaptchaV3Service
} from "ng-recaptcha";




@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent,
    ForgetpasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  providers:[  {
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LfjkfklAAAAADJUwOZRG2i4BvushwxssxFOe',
    } as RecaptchaSettings,
  },],

})
export class AuthModule { }
