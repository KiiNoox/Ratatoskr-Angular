import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../core/services/user.service";
//import current user
import {currentUser} from "../../../core/models/currentUser";

@Component({
  selector: 'app-verif',
  templateUrl: './verif.component.html',
  styleUrls: ['./verif.component.css']
})
export class VerifComponent implements OnInit {
currentUser?:currentUser;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    const queryParams = new URLSearchParams(window.location.search);
   this.userService.GetInfo(this.userService.GetEmailFromToken()).then((response)=>{
     this.currentUser=response;
     if (queryParams.get('token')==this?.currentUser?.token!) {
       this.userService.VerifToken(this?.currentUser?.token!).subscribe((response) => {
         console.log(response);
       });
       console.log(queryParams.get('token'));
     }
   });

   }


}
