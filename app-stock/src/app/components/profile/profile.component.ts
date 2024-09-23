import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { Image } from '../../../utils/interfaces/image';
import { User } from '../../../utils/interfaces/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) {}

logout() {
  this.authService.logout();
      // Rediriger l'utilisateur vers la page de connexion (ou une autre page)
      this.router.navigate(['/signin']);
}

avatar: Image = {} as Image;


ngOnInit(): void {
  this.apiService.getUser().subscribe((user: User) => {
    const imageId = user.ImageId; // Récupère ImageId depuis l'objet user

    // Ensuite, appelle l'API pour récupérer l'image correspondante
    if (imageId) {
      this.apiService.getAvatar(imageId).subscribe((avatar: Image) => {
        this.avatar = avatar;
      });
    }
  });
}


}

