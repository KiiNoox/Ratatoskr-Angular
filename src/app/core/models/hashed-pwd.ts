import {User} from "./user";
export class HashedPWD {
  password!:string;
  ChangeDate!:Date;

  //constructor password
  constructor(Password:string){
    this.password=Password;
  }
}
