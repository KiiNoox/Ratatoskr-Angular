import { UserService } from 'src/app/core/services/user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency, Products } from 'src/app/core/models/Products';
import { DetailedOrders } from 'src/app/core/models/detailedOrders';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:8083/ratatoskr/product';
  selectedProduct!: Products;
  constructor(private http: HttpClient) { }

  getFirstprod(): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/first`);
  }
  getAllExceptFirstObject(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}/Aexf`);
  }

  getAllProducts() {
    return this.http.get<any>(`${this.apiUrl}/All`);
  }
  addProduct(name: string, description: string, price: number, address: string, region: string, available: boolean, numberOfStock: number, category: string, file: File): Observable<Products> {
    const formData = new FormData();
    //formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('address', address);
    formData.append('region', region);
    formData.append('available', available.toString());
    formData.append('numberOfStock', numberOfStock.toString());
    formData.append('category', category);

    console.log("LENAAA")
    return this.http.post<Products>(`${this.apiUrl}/add/1?currencyType=TND`, {nameProducts:name, description:description, price:price, adressProducts:address, regionProducts:region, available:available, numberOfStock:numberOfStock});
  }


  updateProducts(product: Products): Observable<Products> {
    console.log(product);
    return this.http.put<Products>(`${this.apiUrl}/update/` + product.idProducts+`?currencyType=`+ product.currencyType, product);
  }



  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }


  getProductById(id:number){
    console.log(this.selectedProduct.idProducts)
    id=this.selectedProduct.idProducts;
    return this.http.get<Products>(`${this.apiUrl}/get/${id}`);
  }


  updateProduct(id: number,name: string, description: string, price: number, address: string, region: string, available: boolean, numberOfStock: number, category: string, file: File): Observable<Products> {
    const formData = new FormData();
    //formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('address', address);
    formData.append('region', region);
    formData.append('available', available.toString());
    formData.append('numberOfStock', numberOfStock.toString());
    formData.append('category', category);


    return this.http.put<Products>(`${this.apiUrl}/update/${id}`, formData);
  }
  /*updateProd(product: Product): Observable<Product> {
    console.log(product.category, product.nameProducts, product.currency);
    const url = `${this.apiUrl}/update/${product.idProducts}?currencyType=TND`;
    return this.http.put<Product>(url, product);
  }*/
  getDetailedOrdersbyDaterange(startDate: String, endDate: String, supplierId: number): Observable<DetailedOrders[]> {
    const url = `http://localhost:8080/ratatoskr/product/order/getstats/${startDate.toString().slice(0,10)}/${endDate.toString().slice(0,10)}/${supplierId}`;
    return this.http.get<DetailedOrders[]>(url);
  }
  getprovProducts(id: number){
    return this.http.get<any>(`${this.apiUrl}/getbyuser/${id}`);
  }
}
