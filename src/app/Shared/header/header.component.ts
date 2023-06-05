import {Component, OnInit} from '@angular/core';
import {currentUser} from "../../core/models/currentUser";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../core/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
currentUser?:currentUser;
  connected: boolean = false;
  constructor(public http: HttpClient, public AuthService: UserService,private router: Router) {

    if (this.AuthService.AutoLogin())
    {
      console.log("Connecting AUto");
      this.connected = true;
      this.AuthService.GetInfo(this.AuthService.GetEmailFromToken()).then(data=>{
        this.currentUser=data; 
        
        
        
      
      }  );
    }
  }

  ngOnInit(): void {
  }


  Logout()
  {
    this.AuthService.Logout();
    this.connected = false;
    window.location.href="/welcome/home";

  }


  SendMail() {

  }

}