import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private PaymentUrl = 'http://localhost:8083/ratatoskr/payment';

  constructor(private http: HttpClient) { }
  
  
  //add user to chatroom
  pay(): Observable<Chat> {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWFsLnNvdWlzc2lAZXNwcml0LnRuIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgyODk2NjIyLCJleHAiOjE2ODI5ODMwMjJ9.8_obmeL2oN1QAh-oaKtEvPIgFohrjr06p_zKdQyf_n5uViNHSSHOBzM4x1WWJ1u-tcaO_xRLPYKuuevXpvqC2Q';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.put<Chat>(`${this.PaymentUrl}/pay`, { headers });
  }

}
