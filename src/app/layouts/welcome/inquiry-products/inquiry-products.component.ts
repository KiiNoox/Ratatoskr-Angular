import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InquiryService } from 'src/app/core/services/inquiry.service';
import { product_type } from 'src/app/core/models/product_type';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-inquiry-products',
  templateUrl: './inquiry-products.component.html',
  styleUrls: ['./inquiry-products.component.css']
})
export class InquiryProductsComponent implements OnInit {
inquiryId:any;
productlist:product_type[] = [];
productlistpp:product_type[] = [];
  constructor(private inquiryService:InquiryService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.inquiryId = this.route.snapshot.params['id'];
    console.log("inquiry id",this.inquiryId);
    //get products from inquiry
    this.inquiryService.getProductsFromInquiry(this.inquiryId).subscribe(
      (data) => {
        this.productlist = data;
        console.log("products :" ,this.productlist);
      });
      //get products from inquiry
      this.inquiryService.getProductsFromInquiry(this.inquiryId).subscribe(
        (data) => {
          this.productlistpp = data;
          console.log("products :" ,this.productlistpp);
        });
  }
addPP(f:NgForm){
  console.log("product id",f.value['SPP']);
  console.log("inquiry id",this.inquiryId);
  this.inquiryService.addProductToInquiry(this.inquiryId,f.value['SPP']).subscribe(
    (data) => {
      console.log("product added to inquiry");
      window.location.reload();
    });

}
}
