import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {recovery} from "../../../core/models/recovery";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
RecoveryAccount:recovery;
ShowOptions:boolean=false;
CheckOTP:boolean=false;
  constructor( private AuthService:UserService,private route:Router) {
    this.RecoveryAccount=new recovery();

  }

  ngOnInit(): void {
  }

  save(f: NgForm) {

    let email = (<HTMLInputElement>document.getElementById("forgot-email"));
  console.log("HELL");
    (<HTMLInputElement>document.getElementById("forgot-email")).setCustomValidity("");
    if (email.validity.valid) {
      this.AuthService.CheckUserPasswordWays(email.value).subscribe((response) => {
          if (response.status==200) {
            console.log(response.body);
            this.RecoveryAccount=response.body as recovery;
            (<HTMLInputElement>document.getElementById("recoverypage1")).remove();
            this.ShowOptions=true;
            console.log(this.RecoveryAccount);
          }

        },
        error => {
          // You can access status:
          if (error.status==404)
          {

            (<HTMLInputElement>document.getElementById("forgot-email")).setCustomValidity("Email NOT FOUND");
            (<HTMLInputElement>document.getElementById("email-alert")).innerText="Email Not Found.";
          }
        });
    }
    else
      (<HTMLInputElement>document.getElementById("email-alert")).innerText="Please enter your email.";
  }


  sendrecovery(recovery: NgForm) {

   if ( (<HTMLInputElement>document.getElementById("email-radio")).checked )
   {
console.log("Sent by email");
      this.AuthService.ForgetPassword(this.RecoveryAccount.email,false,"").subscribe((response) => {
        if (response.status == 200) {
          console.log(response.body);
          this.ShowOptions=false;
          this.CheckOTP=true;
        }
      });

   }
   if ( (<HTMLInputElement>document.getElementById("phone-radio")).checked )
   {
     console.log("Sent by phone");
     this.AuthService.ForgetPassword(this.RecoveryAccount.email,true,this.RecoveryAccount.phone).subscribe((response) => {
       if (response.status == 200) {
         this.ShowOptions=false;
         this.CheckOTP=true;
         console.log(response.body);
       }
     });
   }

  }

  confirm_code(recovery_code: NgForm) {
   if (recovery_code.valid && this.Passwordcheck())
   {
    let token= recovery_code.value['OTP'];
    let email=this.RecoveryAccount.email;
    let password = recovery_code.value['password'];
    this.AuthService.ChangePassword(token,email,password).subscribe((response) => {
      if ( response.status == 200)
      {
        this.route.navigate(['/auth/sign-in']);
      }
    });
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
}
