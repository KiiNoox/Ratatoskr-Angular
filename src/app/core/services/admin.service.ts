import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {currentUser} from "../models/currentUser";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private UserURL = 'http://localhost:8083/ratatoskr/user/';
  constructor(private http: HttpClient) { }

  //get all users
  GetAllUsers(){
    return this.http.get<User[]>(this.UserURL + 'GetAllUsers');
  }
  getAllposts():Observable<any>
  {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts');
  }
  //disable user
  DisableUser(email:string) {
    return this.http.get(this.UserURL + 'deleteUser?emailAdress='+email);
  }
  //Enable user
  EnableUser(email:string) {
    return this.http.get(this.UserURL + 'activateUser?emailAdress='+email);
  }
}
