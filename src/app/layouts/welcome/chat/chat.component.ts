import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Chat } from 'src/app/core/models/chat';
import { User } from 'src/app/core/models/user';
import { ChatService } from 'src/app/core/services/chat.service';
import { UserService } from 'src/app/core/services/user.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { MessageService } from 'src/app/core/services/message.service';
import { Message } from 'src/app/core/models/message';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { error } from 'console';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,AfterViewInit {
chat!:Chat;
ViewChat!:Chat[];
gifSearch:string="";
user!:User;
message!:Message;
email:string ;
ChatRoomName:string="";
messagesent:string="";
editChatroomName!:string;
chatrooms: any;
deleteChatroomId!: number;
triggerdbutton1!: number;
chatroomId!: number;
messages!:Message[];
nbchat!:number;
Addfriend!:string;
Users:any[]=[];
Gifs:any[]=[];
token: string;
phoneNumber: string;

  nbmessage: number;
  webSocketEndPoint: string = 'http://localhost:8083/ratatoskr/ws';
  topic: string = "/chat/emit";
  stompClient: any;

  constructor(

    private chatService:ChatService,
    private userService:UserService,
    private messageService:MessageService,
    public sanitizer: DomSanitizer,
    private http: HttpClient) {
    this.chat=new Chat();
    this.message = new Message();
    this.email=this.userService.GetEmailFromToken();
  }

  ngOnInit(): void {
this.getChatCount(this.email!);
this.getChatList();
this._connect();

}


  ngAfterViewInit(): void {

  }
  saveChatRoom(){


    this.chat.isActive=true;
    this.chat.visibility=true;
    this.chat.nameChat=this.ChatRoomName;
    this.chatService.addChatroom(this.chat,this.email).subscribe(() => {
      console.log("added");
      window.location.reload();
    });

  }


  getChatList(): void{

    this.chatService.getChatList(this.email).subscribe(data =>this.ViewChat=data);
    
  }

  onDeleteConfirm(): void {
    this.chatService.deleteChatroom(this.triggerdbutton1).subscribe(data => {
      console.log("deleted");
      window.location.reload();
    })

  }

  triggerdbutton(chatroomId:number){
  this.triggerdbutton1=chatroomId;

  }


onEditSubmit(){
  this.onSearchid();
  this.chat.idChatRoom=this.triggerdbutton1;
  this.chat.isActive=true;
  this.chat.visibility=true;
  this.chat.nameChat=this.editChatroomName;
  console.log(this.chat);
  this.chatService.updateChatroom(this.chat).subscribe(data => {
  console.log(data);
  console.log("updated");
 
  })

}

onSearchid(){
//retrieveAllChatroomsSortedByName
this.chatService.searchChatroomById(this.triggerdbutton1).subscribe(data => {
  this.chat=data;
  console.log("Found !");
  console.log(data);
  //window.location.reload();
})
}
// <-----------------------------------------------MESSAGE-------------------------------------------------------->
//add message
addMessage(chatroom:number){
this.triggerdbutton1=chatroom;
  //convert date to string
  const now = new Date();
const dateString = now.toISOString();
  this.message.sent=dateString;
  this.message.seen=false;
  this.message.visibility=true;
  this.message.text =this.messagesent;
  console.log("calling logout api via web socket");
  this.stompClient.send("/app/ws/"+chatroom+"/"+this.email, {token :localStorage.getItem('accessToken')}, JSON.stringify(this.message));
  // this.messageService.addMessage(chatroom,this.email,this.message).subscribe(data => {
  //   console.log("message added");
  //   //window.location.reload();
  // })
  //this.stompClient.send("/addMessage" , {}, JSON.stringify(this.message));
}
sendGif(chatroom:number,i:number){
  this.triggerdbutton1=chatroom;
  //convert date to string
  const now = new Date();
  const dateString = now.toISOString();
  this.message.sent=dateString;
  this.message.seen=false;
  this.message.visibility=true;
  this.message.text =this.Gifs[i].images.original.url;
  // this.messageService.addMessage(chatroom,this.email,this.message).subscribe(data => {
  //   console.log("gif sent");
  //   //window.location.reload();
    
  // })
  this.stompClient.send("/app/ws/"+chatroom+"/"+this.email, {token :localStorage.getItem('accessToken')}, JSON.stringify(this.message));
}


_connect(){
  console.log("Initialize WebSocket Connection");
  let ws = new SockJS(this.webSocketEndPoint);
  this.stompClient = Stomp.over(ws);
  const _this = this;
  _this.stompClient.connect({}, function (frame:any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent:any) {
          _this.onMessageReceived(sdkEvent);
          console.log("aa madame "+_this.triggerdbutton1);
         _this.getConversation(_this.triggerdbutton1);
      });
      //_this.stompClient.reconnect_delay = 2000;
  }, this.errorCallBack);
}

    // on error, schedule a reconnection attempt
    errorCallBack(error:any) {
      console.log("errorCallBack -> " + error)
      setTimeout(() => {
          this._connect();
      }, 5000);
  }

onMessageReceived(message:any) {
    console.log("Message Recieved from Server :: " + message);
  //  this.handleMessage(JSON.stringify(message.body));
}

  getConversation(chatroom:number) {
    this.listUsersByChatRoom(chatroom);
    this.messageService.getConversation(chatroom).subscribe((data : any) => {
      this.messages = data.messages;
      console.log("messages");
      console.log(data);
    })
  }




//count chatroom
getChatCount(email:string): void{

  this.chatService.getChatCount(this.email).subscribe(data =>this.nbchat=data);

}

////count message
getCountMessage(): void{
  
  this.messageService.countMessage(this.triggerdbutton1).subscribe(data =>this.nbmessage=data);
}


//delete message
deleteMessage(idmessage:number){


  this.messageService.deleteMessage(idmessage).subscribe(data => {
    console.log("deleted");
    window.location.reload();
  })
}

//add user to chatroom
addUserToChatroom(){

  this.chatService.addUserToChatroom(this.triggerdbutton1,this.Addfriend).subscribe(data => {
    console.log(data);
    console.log("added");
  },
  error => {
    console.log(error);}
    )

}
////listUsersByChatRoom
listUsersByChatRoom(idchatroom: number): void{
console.log("IM HEEEEERE idchatroom"+idchatroom);
    this.chatService.listUsersByChatRoom(idchatroom).subscribe(data =>{
      this.Users=data;
      console.log("subs my users");
    console.log(data);
    },
      );
console.log(this.Users);
}


//LoadGif
LoadGif(){

  this.chatService.LoadGif(this.gifSearch,5).subscribe((res:any) => {
    this.Gifs=res.data;
     console.log(this.Gifs);
  },
  error => {
    console.log(error);}
    );
  }

  translateText(InputID:string){
console.log("TRANSLATING : "+InputID);

 const text = (<HTMLInputElement>document.getElementById(InputID)).value;
 this.chatService.translateText(text).subscribe(

(res:any) => {
console.log(res);
(<HTMLInputElement>document.getElementById(InputID)).value=res[0].translations[0].text;
},
(error) => {
console.log(error);
}
  );
// }
}



}





