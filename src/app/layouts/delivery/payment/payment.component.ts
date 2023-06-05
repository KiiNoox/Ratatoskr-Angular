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
import { PaymentService } from 'src/app/core/services/payment.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
shoppingCart:any
products:Products[];
user!:User;
helper = new JwtHelperService();
email?:string;
currentUser ?:currentUser=new currentUser();
totalPrices:number=0
totalTax:number=0
loading=false

  constructor(
    private shoppingCartService:ShoppingCartService,
    private userService:UserService,
    private cdr:ChangeDetectorRef,
    private orderService:OrderService,
    private router:Router,
    private paymentService:PaymentService
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
 

  pay(){
    this.loading=true
    this.paymentService.pay().subscribe(res=>{
      console.log(res);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'payment success'
      })
      this.loading=false
      this.clearShoppingCart()
      this.router.navigate(["/delivery/order-tracking"])
    })
  }

  clearShoppingCart(){
    this.shoppingCartService.clearShoppingCard(this.shoppingCart.id).subscribe(res=>{
      
      
    })
  }
  
}
