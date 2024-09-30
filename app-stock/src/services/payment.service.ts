import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8051'; 

  constructor(private http: HttpClient) {}


  // Crée une session de paiement Stripe
  createCheckoutSession(cartId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-checkout-session`, { cartId });
  }
}
