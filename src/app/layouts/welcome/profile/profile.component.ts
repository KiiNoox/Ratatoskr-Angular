import {ChangeDetectionStrategy, Component, OnInit, Renderer2} from '@angular/core';
import {ChatService} from "../../../core/services/chat.service";
import {UserService} from "../../../core/services/user.service";
import {currentUser} from "../../../core/models/currentUser";
import flatpickr from "flatpickr";
import {NgForm} from "@angular/forms";
import {User} from "../../../core/models/user";
declare var $: any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser?: currentUser;
  Expiration_Date!:string;
  user: User = new User();
  NbrOfOrders: number = 0;
  Token?: string | null;
AlertHTML:string="";
  constructor(private chatService: ChatService,
              public userService: UserService,private renderer: Renderer2) {

  }


  ngOnInit(): void {
    flatpickr("input[type=datexd]", {});
    if (!history.state.data)
      this.userService.GetInfo(this.userService.GetEmailFromToken()).then(data => {
        this.currentUser = data;
      });
    else
      this.userService.GetInfo(history.state.data).then(data => {
        this.currentUser = data;
      });
  }


  update(f: NgForm) {
    this.user!.email = this.currentUser?.email;
    this.user!.enabled = true;
    this.user!.adress = f.value['adress'];
    this.user!.country = f.value['country'];
    this.user!.firstName = f.value['firstName'];
    this.user!.lastName = f.value['lastName'];
    this.user!.phoneNumber = f.value['phoneNumber'];
    this.user!.birthDate = f.value['birthDate'];
    this.user!.roles = this.currentUser!.roles;
    console.log(this.user);
    this.userService.UpdateUser(this.user).subscribe(data => {
      console.log(data);
    });
    //set the new values for

  }


  ResetUserPassword(p: NgForm) {
    let oldpassword = p.value['oldpassword'];
    let newpass = p.value['password'];
    let confpass = p.value['confpassword'];
    if (newpass == confpass) {
      (<HTMLInputElement>document.getElementById("password")).setCustomValidity("");
      (<HTMLInputElement>document.getElementById("confpassword")).setCustomValidity("");
    } else {
      console.log("not matching");
      (<HTMLInputElement>document.getElementById("password")).setCustomValidity("Passwords Doesn't match");
      return;
    }
    if (p.valid) {
      console.log("valid");
      this.userService.ResetUserPassword(oldpassword, newpass).subscribe((data) => {
        if (data.status == 200) {
          console.log("password changed");
          $('#resetPassword').modal('hide');
          $('#SuccessAlertPassword').modal('show');
        }
      }, (error) => {
      if (error.status == 400) {
          console.log("Date not yet expired");
        (<HTMLInputElement>document.getElementById("confpassword")).setCustomValidity("Date not yet expired");
        this.userService.GetPasswordExpirationDate().subscribe((data)=>{
          const me = Object.create(data);
          (<HTMLInputElement>document.getElementById("newpassconftext")).innerText="You'll be able to change your password : "+me.Expiration_Date;
        },(error)=>{
        });

        } else if (error.status == 403) {
          console.log("Forbidden");
        (<HTMLInputElement>document.getElementById("oldpassword")).setCustomValidity("Wrong Password");
        }
      });
    }

  }

}
