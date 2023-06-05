import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {Form, NgForm} from "@angular/forms";
import {User} from "../../../core/models/user";
import {RL, Roles} from "../../../core/models/Roles";
import {HashedPWD} from "../../../core/models/hashed-pwd";
import {DatePipe} from "@angular/common";

import flatpickr from "flatpickr";





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']

})

export class SignupComponent implements OnInit {

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

  constructor(private AuthService: UserService, private router: Router, private datePipe: DatePipe) {
    //make constructor Roles
    this.Roles = new Roles(RL.ROLE_USER);
    //flatpickr("#datepicker", {});


  }

  ngOnInit(): void {
    flatpickr("input[type=datexd]", {});
  }


  save(f: NgForm) {
    if (f.valid) {
      this.signup.email = f.value['email'];
      this.signup.adress = f.value['adress'];
      this.signup.country = f.value['country']
      this.signup.enabled = true;
      this.signup.lastName = f.value['lastName'];
      this.signup.firstName = f.value['firstName'];
      this.signup.phoneNumber = f.value['phoneNumber'];
      this.signup.birthDate = this.datePipe.transform(f.value['birthDate'], "yyyy-MM-dd");
      this.signup.roles?.push(this.Roles);
      this.HashedPWD = new HashedPWD(f.value['password']);
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
  }

  Passwordcheck() {
    let password = (<HTMLInputElement>document.getElementById("password"));
    let confirmPassword = (<HTMLInputElement>document.getElementById("confirmPassword"));
    let passwordfeedback = (<HTMLInputElement>document.getElementById("passwordfeedback"));
    if (password.value != confirmPassword.value) {
      console.log("not matching");
      password.setCustomValidity("Passwords Doesn't match");
      confirmPassword.setCustomValidity("Passwords Doesn't match");
      passwordfeedback.innerText= "Passwords Doesn't match";
      return false;
    }
    password.setCustomValidity("");
    confirmPassword.setCustomValidity("");
    passwordfeedback.innerText= "Please select a valid password.";
    return true;
  }

  CheckEmail() {
    let email = (<HTMLInputElement>document.getElementById("email"));

    (<HTMLInputElement>document.getElementById("email")).setCustomValidity("");
    if (email.validity.valid) {
      this.AuthService.CheckEmail(email.value).subscribe((response) => {
      if (response.status==200) {

      }

      },
        error => {
          // You can access status:
         if (error.status==302)
         {

           (<HTMLInputElement>document.getElementById("email")).setCustomValidity("Email already exists");
           (<HTMLInputElement>document.getElementById("email-feedback")).innerText="Email already in use.";
         }
        });
    }
    else
      (<HTMLInputElement>document.getElementById("email-feedback")).innerText="Please enter your name.";
  }
}
