import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-add-enterprise',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe,CommonModule],
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
  
      // Récupérer le fichier image sélectionné
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]);
      } else {
        console.error("Aucune image sélectionnée");
        return;
      }
  
      // Appeler l'API pour ajouter l'entreprise avec l'image
      this.api.addEnterpriseWithImage(formData).subscribe({
        next: (response: any) => {
          console.log('Entreprise ajoutée avec succès', response);
        },
        error: (err: any) => {
          console.error('Erreur lors de l\'ajout de l\'entreprise', err);
        }
      });
    } else {
      console.log('Formulaire non valide');
    }
  }

}
