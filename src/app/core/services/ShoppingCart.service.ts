import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../models/Products';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/ShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) {}

  getProductByShoppingCart(shoppingCartId: number):Observable<Products[]> {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWFsLnNvdWlzc2lAZXNwcml0LnRuIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgyODk2NjIyLCJleHAiOjE2ODI5ODMwMjJ9.8_obmeL2oN1QAh-oaKtEvPIgFohrjr06p_zKdQyf_n5uViNHSSHOBzM4x1WWJ1u-tcaO_xRLPYKuuevXpvqC2Q';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const url = `http://localhost:8083/ratatoskr/shoppingCart/getShoppingCartwithProduct/` + shoppingCartId;
    return this.http.get<Products[]>(url, { headers });
  }
  
  getShoppingCardProductForCurrentUser(){
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWFsLnNvdWlzc2lAZXNwcml0LnRuIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgyODk2NjIyLCJleHAiOjE2ODI5ODMwMjJ9.8_obmeL2oN1QAh-oaKtEvPIgFohrjr06p_zKdQyf_n5uViNHSSHOBzM4x1WWJ1u-tcaO_xRLPYKuuevXpvqC2Q';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const url = `http://localhost:8083/ratatoskr/shoppingCart/retrieve-shoppingCart-for-current-user` ;
    return this.http.get<ShoppingCart[]>(url, { headers });
  }




 

  removeProductFromShoppingCard(shoppingCartId: number,productId:number){
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWFsLnNvdWlzc2lAZXNwcml0LnRuIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgyODk2NjIyLCJleHAiOjE2ODI5ODMwMjJ9.8_obmeL2oN1QAh-oaKtEvPIgFohrjr06p_zKdQyf_n5uViNHSSHOBzM4x1WWJ1u-tcaO_xRLPYKuuevXpvqC2Q';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const url = `http://localhost:8083/ratatoskr/shoppingCart/remove-product-from-shoppingCart/${shoppingCartId}/${productId}`;
    return this.http.put(url, { headers });
  }

  clearShoppingCard(shoppingCartId: number){
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWFsLnNvdWlzc2lAZXNwcml0LnRuIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgyODk2NjIyLCJleHAiOjE2ODI5ODMwMjJ9.8_obmeL2oN1QAh-oaKtEvPIgFohrjr06p_zKdQyf_n5uViNHSSHOBzM4x1WWJ1u-tcaO_xRLPYKuuevXpvqC2Q';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const url = `http://localhost:8083/ratatoskr/shoppingCart/clear-shoppingCart/${shoppingCartId}`;
    return this.http.put(url, { headers });
  }
}
