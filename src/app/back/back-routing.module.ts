import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back.component';
import { DeliveryBackComponent } from './delivery-back/delivery-back.component';

const routes: Routes = [{ path: '', component: BackComponent },
{path:'delivery', component: DeliveryBackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackRoutingModule { }
