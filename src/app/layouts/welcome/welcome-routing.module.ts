import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import {MembersComponent} from "./members/members.component";
import {ProfileComponent} from "./profile/profile.component";
import {VerifComponent} from "./verif/verif.component";
import {InquiryComponent} from "./inquiry/inquiry.component";
import { CreateInquiryComponent } from './create-inquiry/create-inquiry.component';
import { ProductsComponent } from './products/products.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductupdateComponent } from './productupdate/productupdate.component';
import { StatsComponent } from './stats/stats.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProviderprodsComponent } from './providerprods/providerprods.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { InquiryProductsComponent } from './inquiry-products/inquiry-products.component';


const routes: Routes = [{path: '',redirectTo: 'home',pathMatch: 'full'},
{ path: 'home', component: HomeComponent },
{ path: 'chat', component: ChatComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'members', component: MembersComponent },
  { path: 'verif', component: VerifComponent },
  { path: 'inquiry', component: InquiryComponent },
  {path:'create-inquiry',component:CreateInquiryComponent},
  { path: 'products', component: ProductsComponent },
{ path: 'addproduct', component: AddproductComponent },
{ path: 'productdetail', component: ProductdetailComponent },
{ path: 'productupdate/:id', component: ProductupdateComponent},
{ path: 'stats', component: StatsComponent},
{ path: 'Provider', component: ProviderprodsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },
  {path:'inquiry/inquiry-products/:id',component:InquiryProductsComponent}


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
