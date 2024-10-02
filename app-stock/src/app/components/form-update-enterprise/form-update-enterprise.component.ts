import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Enterprise } from '../../../utils/interfaces/enterprise';
import { Image } from '../../../utils/interfaces/image';
import { EnterpriseCategories, EnterpriseCategory } from '../../../utils/interfaces/enterpriseCategory';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-update-enterprise',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-update-enterprise.component.html',
  styleUrls: ['./form-update-enterprise.component.css']
})
export class FormUpdateEnterpriseComponent implements OnInit {

  private api = inject(ApiService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  enterprise: Enterprise = {} as Enterprise;
  imageEnterprise: Image = {} as Image;
  enterpriseCategory: EnterpriseCategory = {} as EnterpriseCategory;
  enterpriseCategories: EnterpriseCategories = [] as EnterpriseCategories;
  updateEnterpriseForm!: FormGroup;

  ngOnInit(): void {
    this.api.getUser().subscribe((user) => {
      if (user.EnterpriseId) {
        this.api.getEnterpriseById(user.EnterpriseId).subscribe((enterprise: Enterprise) => {
          this.enterprise = enterprise;
          this.api.getImageById(enterprise.ImageId).subscribe((imageEnterprise: Image) => {
            this.imageEnterprise = imageEnterprise;
          });
          this.api.getEnterpriseCategory(enterprise.EnterpriseCategoryId).subscribe((enterpriseCategory: EnterpriseCategory) => {
            this.enterpriseCategory = enterpriseCategory;
          });
          this.api.getEnterpriseCategories().subscribe((categories: EnterpriseCategory[]) => {
            this.enterpriseCategories = categories;
            // Ne pas initialiser le formulaire tant que toutes les données ne sont pas disponibles
            this.initializeForm();
            console.log(this.enterprise.EnterpriseCategoryId)
          });
        });
      }
    });
  }
  

  initializeForm() {
    this.updateEnterpriseForm = this.formBuilder.group({
      name: [this.enterprise?.name || '', Validators.required],
      siret: [this.enterprise?.siret || '', Validators.required],
      address: [this.enterprise?.address || '', Validators.required],
      enterpriseCategory: [this.enterprise?.EnterpriseCategoryId || null, Validators.required],
      iban: [this.enterprise?.iban || '', Validators.required],
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
            this.updateEnterpriseImage(response.image.id);
          }
        },
        error: (error) => {
          console.error('Erreur lors du téléchargement de l\'image:', error);
        }
      });
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('imageEnterprise') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  updateEnterpriseImage(imageId: number) {
    const updatedEnterprise: Partial<Enterprise> = { ImageId: imageId };
    if (this.enterprise.id) {
      this.api.updateEnterprise(this.enterprise.id, updatedEnterprise).subscribe({
        next: () => {
          this.api.getImageById(imageId).subscribe((newImage: Image) => {
            this.imageEnterprise = newImage;
          });
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'image de l\'entreprise:', err);
        }
      });
    }
  }

  onSubmit() {
    if (this.updateEnterpriseForm.valid) {
      const updatedEnterprise: Partial<Enterprise> = this.updateEnterpriseForm.value;
      if (this.enterprise.id) {
        this.api.updateEnterprise(this.enterprise.id, updatedEnterprise).subscribe({
          next: () => {
            this.router.navigate([`/enterprise-details/${this.enterprise.id}`]);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour des informations de l\'entreprise:', err);
          }
        });
      }
    }
  }
}
