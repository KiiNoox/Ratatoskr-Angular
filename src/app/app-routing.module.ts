import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth.guard";
import {AzertyComponent} from "./layouts/azerty/azerty.component";
import {WelcomeComponent} from "./layouts/welcome/welcome.component";
import { DeliveryComponent } from './layouts/delivery/delivery.component';
import { BackComponent } from './back/back.component';

const routes: Routes = [{path: 'auth',redirectTo: 'auth/sign-in',pathMatch: 'full'},
{path: '',redirectTo: 'welcome/home',pathMatch: 'full'},

{ path: 'welcome',component:WelcomeComponent, loadChildren: () => import('./layouts/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'auth', loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule) ,canActivate: [AuthGuard]},
{ path: 'azerty',component:AzertyComponent, loadChildren: () => import('./layouts/azerty/azerty.module').then(m => m.AzertyModule) },
{ path: 'delivery',component:DeliveryComponent, loadChildren: () => import('./layouts/delivery/delivery.module').then(m => m.DeliveryModule) },
{path:'back',component:BackComponent,loadChildren: () => import('./back/back.module').then(m => m.BackModule)}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
