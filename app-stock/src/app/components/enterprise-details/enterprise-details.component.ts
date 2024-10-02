import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../utils/interfaces/user';
import { Enterprise } from '../../../utils/interfaces/enterprise';
import { Image } from '../../../utils/interfaces/image';
import { RouterLink } from '@angular/router';
import { EnterpriseCategory } from '../../../utils/interfaces/enterpriseCategory';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enterprise-details',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './enterprise-details.component.html',
  styleUrl: './enterprise-details.component.css'
})
export class EnterpriseDetailsComponent {

  private api = inject(ApiService);
  private auth = inject(AuthService);

  user: User = {} as User;
  enterprise: Enterprise = {} as Enterprise;
  imageEnterprise: Image = {} as Image;
  enterpriseCategory: EnterpriseCategory = {} as EnterpriseCategory;
  isGestionnaire = this.auth.isGestionnaire();

  ngOnInit(): void {
    this.api.getUser().subscribe((user: User) => {
      this.user = user;
  

      if (this.user.EnterpriseId !== undefined) {
        this.api.getEnterpriseById(this.user.EnterpriseId).subscribe((enterprise: Enterprise) => {
          this.enterprise = enterprise;
          console.log(enterprise);

          this.api.getImageById(this.enterprise.ImageId).subscribe((imageEnterprise: Image) => {
            this. imageEnterprise = imageEnterprise;
            if (!imageEnterprise) {
              this.imageEnterprise.url = "https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png";
            }
          })

          this.api.getEnterpriseCategory(this.enterprise.EnterpriseCategoryId).subscribe((enterpriseCategory: EnterpriseCategory) => {
            this.enterpriseCategory = enterpriseCategory;
          })
        });
      } else {
        console.log("Pas d'entreprise assignée à cet user");
      }
    });
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      this.api.uploadImage(formData).subscribe({
        next: (response) => {
          if (response && response.image && response.image.id) {
            console.log('Image uploadée avec succès:', response);
            // Mise à jour de l'image de l'entreprise après le téléchargement réussi
            this.updateEnterpriseImage(response.image.id);
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
  
  triggerFileInput() {
    const fileInput = document.getElementById('imageEnterprise') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  
  updateEnterpriseImage(imageId: number) {
    if (this.enterprise.id) {
      const updatedEnterprise: Partial<Enterprise> = { ImageId: imageId };
      this.api.updateEnterprise(this.enterprise.id, updatedEnterprise).subscribe({
        next: () => {
          // Récupérer la nouvelle image uploadée pour mettre à jour l'affichage
          this.api.getImageById(imageId).subscribe((newImage: Image) => {
            this.imageEnterprise = newImage;
          });
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'image de l\'entreprise:', err);
        }
      });
    } else {
      console.error("L'ID de l'entreprise est manquant.");
    }
  }

}
