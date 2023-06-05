import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './layouts/welcome/welcome.component';
import { DeliveryComponent } from './layouts/delivery/delivery.component';
import {JwtModule} from "@auth0/angular-jwt";
import {DatePipe} from "@angular/common";
import {AuthComponent} from "./layouts/auth/auth.component";
import { SharedModule } from './Shared/shared.module';
import {AzertyComponent} from "./layouts/azerty/azerty.component";
import {HomeComponent} from "./layouts/welcome/home/home.component";
import {AzertyModule} from "./layouts/azerty/azerty.module";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';
//JWT stored
export function tokenGetter() {
  return localStorage.getItem("accessToken");
}

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8083"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    SharedModule,
    AzertyModule,
    SocialLoginModule,
  ],
  providers: [DatePipe,
{
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('190297606812619')
      }
    ],
    onError: (err) => {
      console.error(err);
    }
  } as SocialAuthServiceConfig,
}],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
