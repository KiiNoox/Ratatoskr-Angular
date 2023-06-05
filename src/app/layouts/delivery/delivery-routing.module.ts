import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './delivery.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListDeliveryComponent } from './order-list-delivery/order-list-delivery.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [{ path: '', component: DeliveryComponent },
  {path:'shipping-info', component: ShippingInfoComponent},
  { path: 'order-tracking/:id', component: OrderTrackingComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-list-delivery', component: OrderListDeliveryComponent },
  {path:'payment', component: PaymentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
