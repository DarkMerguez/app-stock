import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Abonnement au statut de connexion
    this.authService.loginStatusChanged.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Abonnement au changement de rôle
    this.authService.userRoleChanged.subscribe(role => {
      this.isAdmin = role === 'Admin';
    });

    // Initialisation des valeurs
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

}