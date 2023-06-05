import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private ChatUrl = 'http://localhost:8083/ratatoskr/chatroom';

  constructor(private http: HttpClient) { }
  //add chatroom
  addChatroom(chat: Chat,email:string): Observable<Chat> {
    return this.http.post<Chat>(`${this.ChatUrl}/addChatroom/?email=`+email, chat);
  }

  //get chatroom
  getChatList(email:string): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.ChatUrl}/GetALLChatroomsforUser/`+ email);
  }
//delete chatroom
  deleteChatroom(idchatroom:number): Observable<any> {
    return this.http.get(`${this.ChatUrl}/deleteChatRoom/`+idchatroom);
  }

  //count chatroom
  getChatCount(email:string): Observable<number> {
    return this.http.get<number>(`${this.ChatUrl}/countChatRoomByUser/`+email);
  }

 //add user to chatroom
 addUserToChatroom(idchatroom: number,email:string) {
  console.log("idchatroom"+idchatroom +"email"+email);
  return this.http.get(`${this.ChatUrl}/AddUserToChatRoom?ce=`+idchatroom+`&email=`+email);
}

//listUsersByChatRoom
listUsersByChatRoom(idchatroom: number): Observable<any> {
  return this.http.get<any>(`${this.ChatUrl}/listUsersByChatRoom/`+idchatroom);
}


  //get chatroom by name
  getChatByName(name: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.ChatUrl}/${name}`);
  }
  //update chatroom
  updateChatroom(chat: Chat): Observable<Chat> {
    return this.http.put<Chat>(`${this.ChatUrl}/updatechatroom`, chat);
  }


//retrieveAllChatroomsSortedByName
  retrieveAllChatroomsSortedByName(idchatroom:string): Observable<Chat> {
    return this.http.get<Chat>(`${this.ChatUrl}/retrieveAllChatroomsSortedByName/`+idchatroom);
  }
//search chatroom by id

  searchChatroomById(idchatroom:number): Observable<Chat> {
    return this.http.get<Chat>(`${this.ChatUrl}/searchbyid/`+idchatroom);
  }
  LoadGif(q:string,limit:number) {

   return this.http.get('https://api.giphy.com/v1/gifs/search?api_key=jpUyerYuS0v82H2gI843BoxC8q9nHoVa&q='+q+'&limit='+limit+'&offset=0&rating=g&lang=en');
  }

public translateText(text:string){
   const API='https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=fr';

   const headers = new HttpHeaders({
    'Ocp-Apim-Subscription-Key':'d4e2004972404020a1c66f90e48899e4',
    'Ocp-Apim-Subscription-Region':'southafricanorth',
    'Content-type':'application/json',
   });

return this.http.post(API,[{'Text':text}],{headers:headers});

}
}
