import { Component, inject } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private auth = inject(AuthService)

  isLoggedIn = this.auth.isLoggedIn();

}
