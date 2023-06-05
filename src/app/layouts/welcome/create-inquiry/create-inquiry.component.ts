import { Component, OnInit } from '@angular/core';
import { currentUser } from 'src/app/core/models/currentUser';
import { inquiry } from 'src/app/core/models/inquiry';
import { InquiryService } from 'src/app/core/services/inquiry.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-inquiry',
  templateUrl: './create-inquiry.component.html',
  styleUrls: ['./create-inquiry.component.css']
})
export class CreateInquiryComponent implements OnInit {
  form:boolean=true;
  currentUser?:currentUser;
  Inquiry:inquiry=new inquiry();
  closeResult!: string;
  constructor(private inquiryService:InquiryService,private AuthService:UserService
    ) { }

  ngOnInit(): void {

this.Inquiry= {
  category:"",
  create_date:new Date(),
  description:"",
  expire_date:new Date(),
  status:"live",
}

      }
addInquiry(){
  this.inquiryService.addInquiry(this.Inquiry).subscribe(
    (data) => {
      this.AuthService.GetInfo(this.AuthService.GetEmailFromToken()).then(datax=>{
        this.currentUser=datax;
        data.userInquiries=this.currentUser?.id;
        console.log("current user :" ,data);
      console.log(data);
    }
  )
  this.form=false;


    }
  )
}
}




