import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private MessageUrl = 'http://localhost:8083/ratatoskr/message';
  constructor(private http: HttpClient) { }


//add message to chatroom
addMessage(chatid:number,email:string,message :Message): Observable<string>{
  return this.http.post<string>(`${this.MessageUrl}/addMessage?IdChatRoom=`+chatid+`&email=`+email, message);
}

//show message
getConversation(idchatroom:number): Observable<Message[]>{
  return this.http.get<Message[]>(`${this.MessageUrl}/ListMessagesByChatRoom/`+idchatroom);
}
//delete message
deleteMessage(idmessage:number): Observable<any> {
  return this.http.get(`${this.MessageUrl}/removeMessage/`+idmessage);
}
//count message
countMessage(idchatroom:number): Observable<number>{
  return this.http.get<number>(`${this.MessageUrl}/countMessagesByChatRoom/`+idchatroom);
}







}
