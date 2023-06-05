import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {HttpClient} from "@angular/common/http";
import {currentUser} from "../../../core/models/currentUser";
import { Products } from 'src/app/core/models/Products';
import { ProductService } from 'src/app/core/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
CurrentUser?:currentUser;
ConnectedEmail:string="";
firstObject!: Products;
  productList!: any[];

  constructor(private AuthService:UserService,public http: HttpClient,
    private productService: ProductService,private router: Router,private route: ActivatedRoute) {

    // this.AuthService.PingTest().subscribe((response)=>{
    //   console.log(response);
    // });;
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')!=null)
    {
    this.ConnectedEmail=this.AuthService.GetEmailFromToken();
    if (this.AuthService.LoggedIn())
    {
      $('#ExpiredSessionModal').modal('show');
      localStorage.removeItem('accessToken');
    }
    }

    this.productService.getAllProducts().subscribe(data => {
      this.productList = data;
      console.log(data);
    });
    this.productService.getFirstprod().subscribe(
      (data: Products) => this.firstObject = data,
      (error: any) => console.error(error)
    );
    console.log(this.firstObject);
    this.productService.getAllExceptFirstObject().subscribe(data => {
      this.productList = data;
      console.log(data);
    })
  }

  SendMail() {

  }
}
