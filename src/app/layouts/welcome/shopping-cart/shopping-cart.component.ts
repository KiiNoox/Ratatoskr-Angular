import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { User_shoppingcart } from 'src/app/core/models/user_shoppingcart';
import { product_type } from 'src/app/core/models/product_type';
import { UserService } from 'src/app/core/services/user.service';
import { currentUser } from 'src/app/core/models/currentUser';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  title = 'api-angular';
productlist:product_type[] = [];
currentUser?:currentUser;
quantity:number = 0;
totalPrice:number = 0;
shid:number = 0;
convertedUSD:number = 0;
convertedEUR:number = 0;
convertedGBP:number = 0;
  constructor(
    private shoppingCartService:ShoppingCartService,private AuthService:UserService,private http: HttpClient

  ) { }

  ngOnInit(): void {

    this.AuthService.GetInfo(this.AuthService.GetEmailFromToken()).then(data=>{
      this.currentUser=data;
      console.log("current user :" ,data);

    //get products in shopping cart from current user
    this.shoppingCartService.getProductsInShoppingCartByUserId(data!.id!).subscribe(
      (data) => {
        this.productlist = data;
        console.log("products :" ,this.productlist);
      });
//get total price from shopping cart from current user
this.shoppingCartService.getTotalPriceFromShoppingCartbyUserId(this.currentUser?.id!).subscribe(
  (data) => {
    this.totalPrice = data;
    console.log("total price :" ,this.totalPrice);
    this.shoppingCartService.convertCurrency('TND','USD',this.totalPrice).subscribe(
      (data:any) => {
        this.convertedUSD = data.new_amount;
        console.log("converted :" ,this.convertedUSD);
      });
      this.shoppingCartService.convertCurrency('TND','EUR',this.totalPrice).subscribe(
        (data:any) => {
          this.convertedEUR = data.new_amount;
          console.log("converted :" ,this.convertedEUR);
        });
        this.shoppingCartService.convertCurrency('TND','GBP',this.totalPrice).subscribe(
          (data:any) => {
            this.convertedGBP = data.new_amount;
            console.log("converted :" ,this.convertedGBP);
          });
  });


  //get quantity from shopping cart from current user
  this.shoppingCartService.getQuantityFromShoppingCartbyUserId(this.currentUser?.id!).subscribe(
    (data) => {
      this.quantity = data;
      console.log("quantity :" ,this.quantity);
    });
    //get shopping cart id by user id in shid
this.shoppingCartService.getShoppingCartIdByUserId(this.currentUser?.id!).subscribe(
  (data) => {
    this.shid = data;
    console.log("shopping cart id :" ,this.shid);
  });




    }  );


  }
  onDelete(shid:any,pid:any){
    this.shoppingCartService.removeProductFromShoppingCart(shid,pid).subscribe(
      (data) => {
        console.log("deleted");
      }
    )
    window.location.reload();

  }
}
