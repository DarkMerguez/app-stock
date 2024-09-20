import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SignupComponent,RouterLink,FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Stockez le token dans le localStorage ou un service d'état
        localStorage.setItem('token', response.token);
        // Redirigez l'utilisateur vers la page souhaitée après la connexion
        this.router.navigate(['/dashboard']); // Ajustez selon votre besoin
      },
      error: (error) => {
        // Gérez l'erreur de connexion (affichez un message, etc.)
        console.error('Login failed', error);
      }
    });
  }

}
