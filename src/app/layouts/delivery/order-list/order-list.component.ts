import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { currentUser } from 'src/app/core/models/currentUser';
import { Orders } from 'src/app/core/models/orders.model';
import { DeliveryService } from 'src/app/core/services/delivery.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {


  dataa: Subscription = new Subscription;
  

  order!: Orders;
  ordersList: any;
  currentUser?:currentUser;

  constructor(private deliveryService: DeliveryService,private AuthService:UserService) {}

  ngOnInit(): void {
    this.AuthService.GetInfo(this.AuthService.GetEmailFromToken()).then(data=>{
      this.currentUser=data; 
      console.log("users order:");
      console.log(this.currentUser?.user_orders);
      this.ordersList=this.currentUser?.user_orders;
    
    }  );
    /*this.deliveryService.retrieveAllOrders().subscribe(
      ordersList => {
        this.ordersList = ordersList;
        console.log(this.ordersList);
        
      }
    );*/
  }

  cancelOrder(id:number){
      this.deliveryService.deleteOrder(id).subscribe((data)=>{
        this.deliveryService.retrieveAllOrders().subscribe(
          ordersList => {
            this.ordersList = ordersList;
            console.log(this.ordersList);
            
          }
        );
      })
  }

}
