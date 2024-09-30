import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8051';  // URL de ton backend

  constructor(private http: HttpClient) {}

  // Récupérer le panier pour une entreprise via son EnterpriseId
  getCart(enterpriseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart/${enterpriseId}`);
  }

  // Récupérer les détails du panier 
  getCartDetails(enterpriseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart/details/${enterpriseId}`);
}

  // Ajouter un produit au panier
  addProductToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart`, { productId, quantity });
  }

}
