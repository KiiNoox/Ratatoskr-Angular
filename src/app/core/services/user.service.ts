import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../models/login";
import {currentUser} from "../models/currentUser";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../models/user";
import {BehaviorSubject} from "rxjs";
import {Roles} from "../../core/models/Roles";


@Injectable({
  providedIn: 'root'
})

export class UserService {
  token ?:string | null;
  helper = new JwtHelperService();
  public roles: Roles[];
  public current: currentUser = {
    email:undefined,
    adress: undefined,
    firstName: undefined,
    lastName: undefined,
    birthDate: undefined,
    phoneNumber: undefined,
    img_URL: undefined,
    roles: undefined,
    user_orders: undefined,
    shoppingCart: undefined,
    token: undefined,
    id: undefined
  };
  private AuthURL = 'http://localhost:8083/ratatoskr/api/auth/'; //+signin or +signup
  private TestURL = 'http://localhost:8083/ratatoskr/api/test/'; //+admin +user +provider +all
  private UserURL = 'http://localhost:8083/ratatoskr/user/';
  private PasswordURL= 'http://localhost:8083/ratatoskr/password/';

  private userSource = new BehaviorSubject<currentUser>(this.current);
  currentUser = this.userSource.asObservable();
  constructor(private http: HttpClient) {
    this.roles=[];

  }


  Signin(user: Login, provider: string){
    return this.http.post<Login>(this.AuthURL + 'signin?Provider='+provider, user);
    //return this.http.post(this.AuthURL, 'signin', user);
  }

  //signup
  SignUp(user: User){
    return this.http.post<User>(this.AuthURL + 'signup', user);
  }


  async GetInfo(email: String): Promise<currentUser|undefined> {
    return await this.http.get<currentUser>(this.UserURL + 'GetUserByEmail?email=' + email).toPromise();
  }

  // EXTRA

  Logout(){
    localStorage.removeItem('accessToken');
  }
  LoggedIn(){
    const accessToken = localStorage.getItem('accessToken');
    
    console.log("Loading User DATA : "+accessToken + "Expiration : "+!!this.helper.isTokenExpired(accessToken));
    return !!this.helper.isTokenExpired(accessToken);
  }
  AutoLogin():boolean{
    if (!this.LoggedIn())
    {
      console.log("LoggedIN");
      this.token=localStorage.getItem('accessToken');
      const decodedToken = this.helper.decodeToken(this.token!);
      console.log("Decoded Token : "+decodedToken.sub);
      this.GetInfo(decodedToken.sub).then((response) => {
        this.current.email=response?.email;
        this.current.adress=response?.adress;
        this.current.firstName=response?.firstName;
        this.current.lastName=response?.lastName;
        this.current.birthDate=response?.birthDate;
        this.current.phoneNumber=response?.phoneNumber;
        this.current.img_URL=response?.img_URL;
        this.current.roles=response?.roles;
        this.roles=response?.roles!;
        //Set Value to OBSERVABLE

        // console.log("From Service : " +this.current.adress);

      });
      this.userSource.next(this.current);
      return true;
    }
    return false;
  }
  GetEmailFromToken():string{
      this.token = localStorage.getItem('accessToken');
      const decodedToken = this.helper.decodeToken(this.token!);
      console.log("hey "+decodedToken);
      return decodedToken.sub;
    }
//Update user
  UpdateUser(user: User){
    return this.http.put<User>(this.UserURL + 'updateUser', user);
  }

  CheckEmail(email: string){
    console.log("Checking Email : "+email);
    return this.http.get(this.UserURL + 'userExists?email=' + email,{observe: 'response'});
  }

  isAdmin() {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].name.toString().indexOf("ROLE_ADMIN" )>-1)
        return true;
    }

    return false;
  }
  isUser() {
    for (let i = 0; i < Roles.length; i++) {
      if (this.roles[i].name.toString().indexOf("ROLE_USER") > -1)
        return true;
    }
    return false;
  }
  isProvider() {
    for (let i = 0; i < Roles.length; i++) {
      if (this.roles[i].name.toString().indexOf("ROLE_PROVIDER") > -1)
        return true;
    }
    return false;
  }

  isDelivery() {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].name.toString().indexOf("ROLE_DELIVERY") > -1)
      {
        console.log("hello");

        return true;
      }
        
    }
    return false;
  }

  //Forget Password
  ForgetPassword(email: string,Phone:boolean,PhoneNum:string){
    return this.http.get(this.UserURL + 'recovery/ForgotPassword?email=' + email+'&Phone='+Phone+'&PhoneNum='+PhoneNum,{observe: 'response'});
  }

  //Load User ways to recover pass
  CheckUserPasswordWays(email: string){
    return this.http.get(this.UserURL + 'recovery/userRecovery?email=' + email,{observe: 'response'});
  }

  ChangePassword(token:string,email:string,password:string)
  {
    //new hashmap
    let obj = {
      "password": password,
      "newPassword": password
    }
    return this.http.post(this.UserURL + 'recovery/VerifyForgotPasswordToken?token=' + token+'&email='+email,obj ,{observe: 'response'});
  }

  ResetUserPassword(oldPassword:string,newpassword:string) {
    let objPassword = {
      "password": oldPassword,
      "newPassword": newpassword
    }
    return this.http.put(this.PasswordURL + 'edit',objPassword,{observe: 'response'});
  }

  GetPasswordExpirationDate() {
    return this.http.get(this.UserURL + 'RetievePasswordInfo');
  }

  VerifToken(token:string)
  {
    return this.http.get(this.UserURL + 'confirm-account?token='+ token,{observe: 'response'});
  }
}
