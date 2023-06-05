import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { DeliveryComponent } from './delivery.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListDeliveryComponent } from './order-list-delivery/order-list-delivery.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    ShippingInfoComponent,
    DeliveryComponent,
    OrderTrackingComponent,
    OrderListComponent,
    OrderListDeliveryComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    LeafletModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class DeliveryModule { }
