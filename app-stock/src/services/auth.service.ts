import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  private userRole = new BehaviorSubject<string | null>(this.getRole());

  loginStatusChanged = this.loginStatus.asObservable();
  userRoleChanged = this.userRole.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post("http://localhost:8051/login", { email, password });
  }

  logout() {
    // Supprimer le token stocké
    localStorage.removeItem('token');
    // Notifier les autres composants que l'utilisateur est déconnecté
    this.loginStatus.next(false);
    this.userRole.next(null); // Réinitialise le rôle utilisateur
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Méthode pour mettre à jour le statut de connexion et le rôle lors du login
  updateLoginStatus() {
    this.loginStatus.next(this.isLoggedIn());
    this.userRole.next(this.getRole());
  }

  // Fonction pour décoder le payload du token
  getPayload() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const asciiPayload = token.split(".")[1];
    const jsonPayload = atob(asciiPayload);
    return JSON.parse(jsonPayload);
  }

  // Récupère le rôle de l'utilisateur
  getRole(): string | null {
    const payload = this.getPayload();
    return payload ? payload.role : null;
  }

  // Vérifier si l'utilisateur a le rôle Admin
  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  // Vérifier si l'utilisateur a le rôle Gestionnaire
  isGestionnaire(): boolean {
    return this.getRole() === 'Gestionnaire';
  }
}