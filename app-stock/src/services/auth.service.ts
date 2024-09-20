import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post("http://localhost:8051/login", { email, password });
  }

  logout() {
    // Supprimer le token stocké
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Vérifiez si un token existe dans le localStorage
    return !!localStorage.getItem('token');
  }



}
