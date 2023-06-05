import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../models/Products';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/ShoppingCart';
import { Orders } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}


  saveOrder(shoppingCartId: number):Observable<Orders>{
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWFsLnNvdWlzc2lAZXNwcml0LnRuIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgyODk2NjIyLCJleHAiOjE2ODI5ODMwMjJ9.8_obmeL2oN1QAh-oaKtEvPIgFohrjr06p_zKdQyf_n5uViNHSSHOBzM4x1WWJ1u-tcaO_xRLPYKuuevXpvqC2Q';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const url = `http://localhost:8083/ratatoskr/Order/addOrder/${shoppingCartId}`;
    return this.http.put<Orders>(url, { headers });
  }
}