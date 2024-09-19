import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../utils/interfaces/product';
import { ProductCategories } from '../../../utils/interfaces/productCategory';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOption } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatSelectModule,MatFormFieldModule,AsyncPipe,MatOption,CommonModule],
  templateUrl: './form-add-product.component.html',
  styleUrl: './form-add-product.component.css'
})
export class FormAddProductComponent {

  productGroup = new FormGroup({
    name : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(3)
    ]),
    price : new FormControl<number | null>(null,[
      Validators.required
    ]),
    description : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(10)
    ]),
    stock : new FormControl<number | null>(null,[
      Validators.required
    ]),
    ProductCategoryId: new FormControl<string>("", [
      Validators.required
    ])
  });

  private api = inject(ApiService);

  productCategories$ = this.api.getProductCategories();


  onSubmit() {
    if (this.productGroup.valid) {
      const formData = new FormData();
      
      // Ajouter les valeurs du formulaire au FormData, avec une valeur par défaut vide si la valeur est undefined
      formData.append('name', this.productGroup.get('name')?.value ?? '');
      formData.append('price', (this.productGroup.get('price')?.value ?? '').toString());
      formData.append('description', this.productGroup.get('description')?.value ?? '');
      formData.append('stock', (this.productGroup.get('stock')?.value ?? '').toString());
      formData.append('ProductCategoryId', this.productGroup.get('ProductCategoryId')?.value ?? '');
      
      // Récupérer le fichier sélectionné et l'ajouter au FormData
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]);
      }
    
      // Appeler l'API avec FormData
      this.api.addProductWithImage(formData).subscribe({
        next: (response) => {
          console.log('Produit ajouté avec succès', response);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du produit', err);
        }
      });
    } else {
      console.log('Formulaire non valide');
    }
  }

}