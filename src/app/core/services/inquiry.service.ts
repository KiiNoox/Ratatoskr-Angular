import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inquiry } from '../models/inquiry';
import { product_type } from '../models/product_type';



@Injectable({
  providedIn: 'root'
})
export class InquiryService {


  private inquiryURL = 'http://localhost:8083/ratatoskr';  // URL to REST API

  constructor(private http: HttpClient) { }

//get all inquiries
  getInquiries(): Observable<inquiry[]> {
    const url = `${this.inquiryURL}/retrieve-all-Inquiries`;
    return this.http.get<inquiry[]>(url);
  }
//get inquiry by id
  getInquiry(id: number): Observable<inquiry> {
    const url = `${this.inquiryURL}/retrieve-Inquiry/${id}`;
    return this.http.get<inquiry>(url);
  }
//add inquiry
  addInquiry(inquiry: inquiry): Observable<inquiry> {
    const url = `${this.inquiryURL}/add-Inquiry`;
    return this.http.post<inquiry>(url, inquiry);
  }
  //remove inquiry
  removeInquiry(id: number): Observable<inquiry> {
    const url = `${this.inquiryURL}/remove-Inquiry/${id}`;
    return this.http.delete<inquiry>(url);
  }
  //modify inquiry
  modifyInquiry(inquiry: inquiry): Observable<inquiry> {
    const url = `${this.inquiryURL}/modify-Inquiry`;
    return this.http.put<inquiry>(url, inquiry);
  }
  //remove product from inquiry empty
  removeProductFromInquiry(id: number): Observable<inquiry> {
    const url = `${this.inquiryURL}/remove-product-from-Inquiry-empty/${id}`;
    return this.http.delete<inquiry>(url);
  }
 //clear inquiry
  clearInquiry(id: number): Observable<inquiry> {
    const url = `${this.inquiryURL}/clear-Inquiry/${id}`;
    return this.http.delete<inquiry>(url);
  }
  //add product to inquiry
  addProductToInquiry(id: number, idProduct: number): Observable<inquiry> {
    const url = `${this.inquiryURL}/add-product-to-Inquiry/${id}/${idProduct}`;
    return this.http.put<inquiry>(url, id);
  }
  //get products from inquiry
  getProductsFromInquiry(id: number): Observable<product_type[]> {
    const url = `${this.inquiryURL}/get-products-from-Inquiry/${id}`;
    return this.http.get<product_type[]>(url);
  }
}
