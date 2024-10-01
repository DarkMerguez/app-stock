import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private baseUrl = 'http://localhost:8051';

  constructor(private http: HttpClient) {}

  generateBill(orderId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/bill/${orderId}`, { responseType: 'blob' });
  }

  
}
