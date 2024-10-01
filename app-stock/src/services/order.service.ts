import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8051';

  constructor(private http: HttpClient) {}

  getOrders(enterpriseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/${enterpriseId}`);
  }

  // Changer statut d'une commande
  updateOrderStatus(orderId: number, newStatus: string) {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/status`, { status: newStatus });
  }

}
