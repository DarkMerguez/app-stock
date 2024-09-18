import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, Products } from '../utils/interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  public getProducts(): Observable<Products> {
    return this.http.get<Products>("http://localhost:8051/products");
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>("http://localhost:8051/product/" + id);
  }

}
