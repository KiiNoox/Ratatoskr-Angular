import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders.model';
import { Delivery } from '../models/delivery.model';
@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private baseUrl = 'http://localhost:8083/ratatoskr/delivery';
  private apiUrl = 'http://localhost:8083/ratatoskr/Order';
  constructor(private http: HttpClient) { }

  getPath(idDelivery: number): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.baseUrl}/getPath/${idDelivery}`);
  }

  getNormalOrders(idDelivery: number): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.baseUrl}/getNormalOrders/${idDelivery}`);
  }

  getAssignedUser(idOrder: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.baseUrl}/getAssignedUser/${idOrder}`);
  }

  deleteDelivery(idDelivery: number): Observable<Delivery[]> {
    return this.http.delete<Delivery[]>(`${this.baseUrl}/deleteDelivery/${idDelivery}`);
  }
  cancelDelivery(idDelivery: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.baseUrl}/cancelDelivery/${idDelivery}`);
  }
  deleteOrder(idOrder: number): Observable<Orders[]> {
    return this.http.delete<Orders[]>(`${this.apiUrl}/deleteOrders/${idOrder}`);
  }

  finishingDelivery(idDelivery: number, statu: string, endDate: string): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.baseUrl}/finishingDelivery/${idDelivery}/${endDate}/${statu}`, null);
  }

  displayDelivery(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.baseUrl}/displayDelivery`);
  }

  averageTime(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/avreageTime`);
  }

  deleteOrderFromDelivery(idOrder: number): Observable<Delivery[]> {
    return this.http.delete<Delivery[]>(`${this.baseUrl}/deleteOrderFromDelivery/${idOrder}`);
  }

  mostFrequentAdresse(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/mostFrequentAdresse`, { responseType: 'text' as 'json' });
  }
  retrieveAllOrders(): Observable<Orders[]> {
    const url = `${this.apiUrl}/retrieveAllOrders`;
    return this.http.get<Orders[]>(url);
  }
  getAddressCoordinate(address: string): Observable<number[]> {
    const url = `${this.baseUrl}/coordinates?address=${encodeURIComponent(address)}`;
    return this.http.get<number[]>(url);
  }
 
}
