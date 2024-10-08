import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../utils/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, AsyncPipe, MatOption, CommonModule],
  templateUrl: './form-add-product.component.html',
  styleUrl: './form-add-product.component.css'
})
export class FormAddProductComponent implements OnInit {

  private api = inject(ApiService);
  user: User = {} as User;
  private router = inject(Router);
  
  ngOnInit(): void {
    this.api.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  productGroup = new FormGroup({
    name: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    price: new FormControl<number | null>(null, [
      Validators.required
    ]),
    description: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(10)
    ]),
    stock: new FormControl<number | null>(null, [
      Validators.required
    ]),
    ProductCategoryId: new FormControl<string>("", [
      Validators.required
    ])
  });


  productCategories$ = this.api.getProductCategories();


  onSubmit() {
    if (this.productGroup.valid) {
      const formData = new FormData();

      // Ajouter les valeurs du formulaire au FormData
      formData.append('name', this.productGroup.get('name')?.value ?? '');
      formData.append('price', (this.productGroup.get('price')?.value ?? '').toString());
      formData.append('description', this.productGroup.get('description')?.value ?? '');
      formData.append('stock', (this.productGroup.get('stock')?.value ?? '').toString());
      formData.append('ProductCategoryId', this.productGroup.get('ProductCategoryId')?.value ?? '');

      // Ajout de l'EnterpriseId de l'utilisateur connecté
      if (this.user.EnterpriseId) {
        formData.append('EnterpriseId', this.user.EnterpriseId.toString());
      } else {
        console.error('EnterpriseId is undefined or invalid');
      }

      // Récupérer les fichiers sélectionnés et les ajouter au FormData
      const fileInput = document.getElementById('images') as HTMLInputElement;
      if (fileInput && fileInput.files) {
        Array.from(fileInput.files).forEach(file => {
          formData.append('images', file);
        });
      }

      // Appeler l'API avec FormData
      this.api.addProductWithImages(formData).subscribe({
        next: (response: any) => {  
          console.log('Produit ajouté avec succès', response);
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {  
          console.error('Erreur lors de l\'ajout du produit', err);
        }
      });
    } else {
      console.log('Formulaire non valide');
    }
  }

}