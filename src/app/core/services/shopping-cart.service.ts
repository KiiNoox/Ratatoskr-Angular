import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User_shoppingcart } from '../models/user_shoppingcart';
import { product_type } from '../models/product_type';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private inquiryURL = 'http://localhost:8083/ratatoskr/shoppingCart';  // URL to REST API

  constructor(private http: HttpClient) { }
//retrieve all shopping cart
  getShoppingCart(): Observable<User_shoppingcart[]> {
    const url = `${this.inquiryURL}/retrieve-all-shoppingCarts`;
    return this.http.get<User_shoppingcart[]>(url);
  }
  //clear shopping cart
  clearShoppingCart(id: number): Observable<User_shoppingcart> {
    const url = `${this.inquiryURL}/clear-shoppingCart/${id}`;
    return this.http.delete<User_shoppingcart>(url);
  }
  //create shopping cart for user
  createShoppingCart(id: number): Observable<User_shoppingcart> {
    const url = `${this.inquiryURL}/create-shoppingCart-for-user/${id}`;
    return this.http.post<User_shoppingcart>(url, id);
  }
  //get total price from shopping cart
  getTotalPriceFromShoppingCartbyUserId(id: number): Observable<number> {
    const url = `${this.inquiryURL}/get-total-price-shoppingCart-by-user/${id}`;
    return this.http.get<number>(url);
  }
  //get quantity from shopping cart
  getQuantityFromShoppingCartbyUserId(id: number): Observable<number> {
    const url = `${this.inquiryURL}/get-quantity-of-products-in-shoppingCart-by-user/${id}`;
    return this.http.get<number>(url);
  }
    //add product to shopping cart
    addProductToShoppingCart(id: number, idProduct: number): Observable<User_shoppingcart> {
      const url = `${this.inquiryURL}/add-product-to-shoppingCart/${id}/${idProduct}`;
      return this.http.put<User_shoppingcart>(url, id);
    }
    //remove product from shopping cart
    removeProductFromShoppingCart(id: number, idProduct: number): Observable<User_shoppingcart> {
      const url = `${this.inquiryURL}/remove-product-from-shoppingCart/${id}/${idProduct}`;
      return this.http.put<User_shoppingcart>(url,id);
    }

    //get shopping cart by user id
    getShoppingCartByUserId(id: number): Observable<User_shoppingcart> {
      const url = `${this.inquiryURL}/get-shoppingCart-by-user/${id}`;
      return this.http.get<User_shoppingcart>(url);
    }
//get products in shopping cart by user id
getProductsInShoppingCartByUserId(id: number): Observable<product_type[]> {
  const url = `${this.inquiryURL}/get-products-in-shoppingCart-by-user/${id}`;
  return this.http.get<product_type[]>(url);

}
//get shopping cart id by user id
getShoppingCartIdByUserId(id: number): Observable<number> {
  const url = `${this.inquiryURL}/get-shoppingCart-id-by-user/${id}`;
  return this.http.get<number>(url);

}
convertCurrency(have:string,want:string,amount:number): Observable<any> {
const url=`https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${have}&want=${want}&amount=${amount}`;
const headers = new HttpHeaders({
  'x-rapidapi-key': '25fed8cd10msh4980f60f0a432ccp1b9e7fjsneaafb3a4fa4d',
  'x-rapidapi-host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
});
return this.http.get<any>(url,{headers});

}
}
