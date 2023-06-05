import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackRoutingModule } from './back-routing.module';
import { BackComponent } from './back.component';
import { DeliveryBackComponent } from './delivery-back/delivery-back.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { SearchPipe } from './delivery-back/search.pipe';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    
    BackComponent,
         DeliveryBackComponent,
         SidebarComponent,
         NavbarComponent,
         SearchPipe
  ],
  imports: [
    CommonModule,
    BackRoutingModule,
    FormsModule,
    ChartsModule
    
  ]
})
export class BackModule { }
