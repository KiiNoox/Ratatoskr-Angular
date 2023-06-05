import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Products } from 'src/app/core/models/Products';
import { ShoppingCartService } from 'src/app/core/services/ShoppingCart.service';
import { currentUser } from 'src/app/core/models/currentUser';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { ShoppingCart } from 'src/app/core/models/ShoppingCart';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrderService } from 'src/app/core/services/order.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import { Orders } from 'src/app/core/models/orders.model';
@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {
shoppingCart:any
products:Products[];
user!:User;
helper = new JwtHelperService();
email?:string;
currentUser ?:currentUser=new currentUser();
totalPrices:number=0
totalTax:number=0
 

  constructor(
    private shoppingCartService:ShoppingCartService,
    private userService:UserService,
    private cdr:ChangeDetectorRef,
    private orderService:OrderService,
    private router:Router,
    private deliveryService:DeliveryService
  ) {

  }
  totalLentgh:any;
  ngOnInit(): void {
    this.getCurrentUser()
    this.getShoppingCard()
  }
  getCurrentUser(){ 
      const decodedToken = this.helper.decodeToken(localStorage.getItem('accessToken')!);
    this.userService.GetInfo(decodedToken.sub).then(user=>this.currentUser=user).then(user=>{
      console.log(user);
      this.cdr.detectChanges()
    })
  }

  getShoppingCard(){
    this.shoppingCartService.getShoppingCardProductForCurrentUser().subscribe(
      (data:any)=>{
        console.log(data);
        this.shoppingCart=data 
      });
  }
  removeProduct(item:any){
    console.log(item);
    
    this.shoppingCartService.removeProductFromShoppingCard(this.shoppingCart.id,item.idProducts)
    .subscribe(res=>{
   this.getShoppingCard()
      this.cdr.detectChanges()
    })
  }

  saveOrder(){
    
    this.orderService.saveOrder(this.shoppingCart.id).subscribe((res:Orders)=>{
      console.log("test adding order:")
      console.log(res);
      this.deliveryService.getAssignedUser(res.idOrders).subscribe((res)=>{
       
      })

    
    })
  }

  
  
}
