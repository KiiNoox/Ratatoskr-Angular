import { Component, OnInit } from '@angular/core';
import { inquiry } from 'src/app/core/models/inquiry';
import { InquiryService } from 'src/app/core/services/inquiry.service';


@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {
  inquirylist:inquiry[] = [];
  router: any;


  constructor(
    private inquiryService:InquiryService
  ) { }

  ngOnInit(): void {
    //get all inquiries from inquiryService
    this.inquiryService.getInquiries().subscribe(
      (data) => {
        this.inquirylist = data;
      }
    )


  }
  onDelete(idinquiry:any){
    this.inquiryService.removeInquiry(idinquiry).subscribe(
      (data) => {
        console.log("deleted");
      }
    )
    window.location.reload();
  }
onInspect(idinquiry:any){
  this.router.navigate(['/inquiry-products',idinquiry]);
}
}
