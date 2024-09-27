import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { Image } from '../../../utils/interfaces/image';
import { User } from '../../../utils/interfaces/user';
import { Enterprise } from '../../../utils/interfaces/enterprise';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
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
user: User = {} as User;
userEnterprise: Enterprise = {} as Enterprise;


ngOnInit(): void {
  this.apiService.getUser().subscribe((user: User) => {
    this.user = user;
    const imageId = user.ImageId; // Récupère ImageId depuis l'objet user
    console.log(user.firstName);
    // Ensuite, appelle l'API pour récupérer l'image correspondante
    if (imageId) {
      this.apiService.getAvatar(imageId).subscribe((avatar: Image) => {
        this.avatar = avatar;
      });
    }
    if (user.EnterpriseId) {
      this.apiService.getEnterpriseById(user.EnterpriseId).subscribe((userEnterprise: Enterprise) => {
        this.userEnterprise = userEnterprise;
      })
    }
  });
}


}

