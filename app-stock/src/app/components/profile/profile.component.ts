import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private authService: AuthService, private router: Router) {}

logout() {
  this.authService.logout();
      // Rediriger l'utilisateur vers la page de connexion (ou une autre page)
      this.router.navigate(['/signin']);
}

}
