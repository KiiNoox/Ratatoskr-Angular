import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AzertyRoutingModule } from './azerty-routing.module';
import { C1Component } from './c1/c1.component';
import { C2Component } from './c2/c2.component';
import {AzertyComponent} from "./azerty.component";
import {SharedModule} from "../../Shared/shared.module";


@NgModule({
  declarations: [
    AzertyComponent,

    C1Component,
    C2Component
  ],
  exports: [
    C1Component,
    C2Component
  ],
  imports: [
    CommonModule,
    AzertyRoutingModule,
    SharedModule
  ]
})
export class AzertyModule { }
