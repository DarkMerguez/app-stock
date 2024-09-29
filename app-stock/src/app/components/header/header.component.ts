import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,SearchResultsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);


  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  text: string = "";


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

  onSubmit() {
    this.router.navigateByUrl(("/search-results/" + this.text));
  }

}