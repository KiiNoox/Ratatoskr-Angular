import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {Login} from "../../../core/models/login";
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider} from "angularx-social-login";
import {User} from "../../../core/models/user";
import {RL, Roles} from 'src/app/core/models/Roles';
import { HashedPWD } from 'src/app/core/models/hashed-pwd';
import {ReCaptchaV3Service} from "ng-recaptcha";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
login!:Login;
  signup: User = {
    //assign to undefned
    adress: undefined,
    country: undefined,
    email: undefined,
    enabled: undefined,
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
    birthDate: undefined,
    roles: [],
    hashedPWD: undefined,

  };
  Roles: Roles;
  HashedPWD?: HashedPWD;
  user: any;
  loggedIn: boolean;
  captcha?: string;
  constructor(private AuthService:UserService,private router:Router,private authService: SocialAuthService) {
    this.Roles = new Roles(RL.ROLE_USER);

  }
//private AuthService:UserService , private router:Router
// this.AuthService.login().subscribe((response)=>{
//   if(response){
//     console.log(response);
//     this.router.navigate(['/welcome/home'])
//   }
// });
  ngOnInit(): void {
    this.login= new Login();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.AuthService.CheckEmail(user.email).subscribe((response)=>{
        console.log("Hello " +response);
          if (response.status==200) {
//Mawjoud deja
            console.log("Creating account");
            this.signup.email = this.user.email;
            this.signup.enabled = true;
            this.signup.Img_URL= this.user.photoUrl;
            this.signup.lastName = this.user.lastName;
            this.signup.firstName = this.user.firstName;
            // this.signup.birthDate = this.datePipe.transform(f.value['birthDate'], "yyyy-MM-dd");
            this.signup.roles?.push(this.Roles);
            this.HashedPWD = new HashedPWD("FacebookPassword");
            this.signup.hashedPWD = this.HashedPWD;
            console.log(this.signup);

            this.AuthService.SignUp(this.signup).subscribe((response) => {
              if (response) {
                console.log(response);
                this.router.navigate(['auth/sign-in']);
              }
              // console.log(f.value['email'] + " " + f.value['password']);
            }, (err) => console.log(err.error.message));
          }
        },
        error => {
        console.log(error.status);
          // You can create an account now
          if (error.status==302) {
            console.log("email found");
            this.login.username=user.email;
            this.AuthService.Signin(this.login,"facebook").subscribe((response) => {
              if (response) {
                console.log(this.login);
                localStorage.setItem('accessToken', response.accessToken);
                window.location.href = "/welcome/home";
              }
            });

          }
          });
      console.log(user);
      this.loggedIn = (user != null);
    });
  }

  save(f: NgForm) {

    if (f.valid) {
      this.login.username = f.value['email'];
      this.login.password = f.value['password'];
      (<HTMLInputElement>document.getElementById("email")).setCustomValidity("");
      (<HTMLInputElement>document.getElementById("email-login")).innerText="Please enter a valid email adress !";
      this.AuthService.Signin(this.login,"local").subscribe((response) => {
        if (response) {
          console.log(this.login);
          localStorage.setItem('accessToken', response.accessToken);
          window.location.href = "/welcome/home";
        }
      },
        error => {
          // You can access status:
          if (error.status==401)
          {
            console.log("error catched");
            (<HTMLInputElement>document.getElementById("email")).setCustomValidity("Email or Password is incorrect");
            (<HTMLInputElement>document.getElementById("email-login")).innerText="Email or Password is incorrect !";
          }
        });
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  errored() {
    console.warn(`reCAPTCHA error encountered`);
  }

}
