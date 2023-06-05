import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { ChatComponent } from './chat/chat.component';
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../../Shared/shared.module";
import {WelcomeComponent} from "./welcome.component";
import {UserService} from "../../core/services/user.service";
import { ProfileComponent } from './profile/profile.component';
import { MembersComponent } from './members/members.component';
import {AdminService} from "../../core/services/admin.service";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { VerifComponent } from './verif/verif.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { InquiryProductsComponent } from './inquiry-products/inquiry-products.component';
import { CreateInquiryComponent } from './create-inquiry/create-inquiry.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductupdateComponent } from './productupdate/productupdate.component';
import { StatsComponent } from './stats/stats.component';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ChartsModule } from 'ng2-charts';
import { ProviderprodsComponent } from './providerprods/providerprods.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    ChatComponent,
  HomeComponent,
  ProfileComponent,
  MembersComponent,
  VerifComponent,
  InquiryComponent,
  InquiryProductsComponent,
  CreateInquiryComponent,
  ProductsComponent,
  AddproductComponent,
  ProductdetailComponent,
  ProductupdateComponent,
  StatsComponent,
  ProviderprodsComponent,
  ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule
],
  providers: [UserService,AdminService],
})
export class WelcomeModule { }
