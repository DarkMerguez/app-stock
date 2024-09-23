import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-form-add-enterprise',
  standalone: true,
  imports: [],
  templateUrl: './form-add-enterprise.component.html',
  styleUrl: './form-add-enterprise.component.css'
})
export class FormAddEnterpriseComponent {

  enterpriseGroup = new FormGroup({
    name : new FormControl<string>("",[
      Validators.required
    ]),
    address : new FormControl<string>("",[
      Validators.required
    ]),
    siret : new FormControl<number | null>(null,[
      Validators.required
    ]),
    EnterpriseCategoryId: new FormControl<string>("", [
      Validators.required
    ])
  });

  private api = inject(ApiService);

  enterpriseCategories$ = this.api.getEnterpriseCategories();


  onSubmit() {
    if (this.enterpriseGroup.valid) {
      const formData = new FormData();
      
      // Ajouter les valeurs du formulaire au FormData
      formData.append('name', this.enterpriseGroup.get('name')?.value ?? '');
      formData.append('address', this.enterpriseGroup.get('address')?.value ?? '');
      formData.append('siret', (this.enterpriseGroup.get('siret')?.value ?? '').toString());
      formData.append('EnterpriseCategoryId', this.enterpriseGroup.get('EnterpriseCategoryId')?.value ?? '');
      
      // Récupérer les fichiers sélectionnés et les ajouter au FormData
      const fileInput = document.getElementById('images') as HTMLInputElement;
      if (fileInput && fileInput.files) {
        Array.from(fileInput.files).forEach(file => {
          formData.append('images', file);
        });
      }
    
      // Appeler l'API avec FormData
      this.api.addProductWithImages(formData).subscribe({
        next: (response: any) => {  // Ajoutez le type 'any' ici
          console.log('Produit ajouté avec succès', response);
        },
        error: (err: any) => {  // Ajoutez le type 'any' ici
          console.error('Erreur lors de l\'ajout du produit', err);
        }
      });
    } else {
      console.log('Formulaire non valide');
    }
  }

}
