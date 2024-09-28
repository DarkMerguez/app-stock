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

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) { }

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
      const imageId = user.ImageId;
      console.log(user.firstName);
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

  //Gestion du fichier sélectionné
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      this.apiService.uploadImage(formData).subscribe({
        next: (response) => {
          if (response && response.image && response.image.id) {
            console.log('Image uploadée avec succès:', response);
            // Mise à jour de l'avatar après le téléchargement réussi
            this.updateUserAvatar(response.image.id);
          } else {
            console.error('Réponse inattendue du serveur', response);
          }
        },
        error: (error) => {
          console.error('Erreur lors du téléchargement de l\'image:', error);
        }
      });
    } else {
      console.error('Aucun fichier sélectionné');
    }
  }
  
  //Ouvre l'explorateur de fichiers
  triggerFileInput() {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  updateUserAvatar(imageId: number) {
    if (this.user.id) {
      const updatedUser: Partial<User> = { ImageId: imageId };
      this.apiService.updateUser(this.user.id, updatedUser).subscribe({
        next: () => {
          // Récupérer l'image uploadée pour la mise à jour de l'affichage
          this.apiService.getAvatar(imageId).subscribe((avatar: Image) => {
            this.avatar = avatar;
          });
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'avatar utilisateur:', err);
        }
      });
    } else {
      console.error("L'ID de l'utilisateur est manquant.");
    }
  }


}

