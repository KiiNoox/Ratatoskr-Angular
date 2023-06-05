import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../core/services/admin.service";
import {currentUser} from "../../../core/models/currentUser";
import {User} from "../../../core/models/user";
import {PaginationInstance} from "ngx-pagination";
import {NgForm} from "@angular/forms";
import flatpickr from "flatpickr";
import {RL, Roles} from "../../../core/models/Roles";
import {HashedPWD} from "../../../core/models/hashed-pwd";
import {DatePipe} from "@angular/common";
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {FileExporterService} from "../../../core/services/file-exporter.service";
declare var $: any



@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
UserList:User[]=[];
posts:any;
title='pagination';
page:number=1;
count:number=0;
tableSize:number=10;
tableSizes:any=[5,10,15,20];
Currentuser?: currentUser ;

  CreatedUser: User = {
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
  cAdmin:boolean=false;
  cUser:boolean=false;
  cProvider:boolean=false;
  cDelivery:boolean=false;
  Roles?: Roles;
  HashedPWD?: HashedPWD;
   myAlert = document.getElementById('myAlert');
  constructor(private adminService:AdminService,private userService:UserService,private datePipe: DatePipe,private router:Router,private fileExportService:FileExporterService) {
  }

  ngOnInit(): void {
this.LoadUsers();

  }

  LoadUsers(){
    flatpickr("input[type=datexd]", {});
    this.adminService.GetAllUsers().subscribe(data=>this.UserList=data);
    this.adminService.getAllposts().subscribe(data=>this.posts=data);
  }
onTableDataChange(event:any){
    this.page=event;
    this.LoadUsers();
}
onTableSizeChange(event:any): void {
this.tableSize=event.target.value;
this.page=1;
this.LoadUsers();
}

  save(f: NgForm) {
    this.CreatedUser.roles=[];
    this.CreatedUser.email = f.value['email'];
    this.CreatedUser.adress = f.value['adress'];
    this.CreatedUser.country = f.value['country']
    this.CreatedUser.enabled = true;
    this.CreatedUser.lastName = f.value['firstName'];
    this.CreatedUser.firstName = f.value['firstName'];
    this.CreatedUser.phoneNumber = f.value['phoneNumber'];
    this.CreatedUser.birthDate = this.datePipe.transform(f.value['birthDate'], "yyyy-MM-dd");
    this.CreatedUser.roles?.push(new Roles(RL.ROLE_USER));
    if( this.cAdmin==true)
      this.CreatedUser.roles?.push(new Roles(RL.ROLE_ADMIN));
    if( this.cProvider==true)
      this.CreatedUser.roles?.push(new Roles(RL.ROLE_PROVIDER));
    if( this.cDelivery==true)
      this.CreatedUser.roles?.push(new Roles(RL.ROLE_DELIVERY));
    this.HashedPWD = new HashedPWD(f.value['password']);
    this.CreatedUser.hashedPWD = this.HashedPWD;

console.log(this.CreatedUser);
this.userService.SignUp(this.CreatedUser).subscribe(data=>console.log(data));

  }

  toggleEditable($event: Event) {
    var event = ($event.target as HTMLInputElement)
    if (event.value == "Admin")
      if (event.checked == true)
        this.cAdmin = true;
      else
        this.cAdmin = false;
    if (event.value == "Provider")
      if (event.checked == true)
        this.cProvider = true;
      else
        this.cProvider = false;
    if (event.value == "Delivery")
      if (event.checked == true)
        this.cDelivery = true;
      else
        this.cDelivery = false;

  }

  ViewUserProfile(email: any) {
    console.log("REDIRECT");
    this.router.navigate(["/welcome/profile"], {state: {data:email}})
  }

  EnableUser(email: string) {
    console.trace();
  this.adminService.EnableUser(email).subscribe(data=>console.log(data));
  }
  DisableUser(email:string)
  {
    console.trace();
  this.adminService.DisableUser(email).subscribe(data=>console.log(data));
  }

  EditUserProfile(email: string) {
    $('#staticBackdropLabel').text("Edit An Account");
    $('#submodaluser').text("Update Account");
    this.userService.GetInfo(email).then((data)=>{
      this.Currentuser=data!;
        console.log(this.Currentuser);
    }
    );
    $('#staticBackdrop').modal('show');
  }

  ResetForm() {
    this.Currentuser=undefined;
    $('#staticBackdropLabel').text("Create An Account");
    $('#submodaluser').text("Create Account");
    $('#staticBackdrop').modal('show');
  }
  download(){
    this.fileExportService.downloadFile(this.UserList, 'ExportedUserList');
  }
}
