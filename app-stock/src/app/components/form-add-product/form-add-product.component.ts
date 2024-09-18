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
    // Vérifier si le formulaire est valide
    if (this.productGroup.valid) {
      // Extraire les valeurs du formulaire
      const product: Product = this.productGroup.value as Product;
      
      // Appeler l'API et souscrire à l'observable
      this.api.addProduct(product).subscribe({
        next: (response) => {
          console.log(response);
          // Vous pouvez ajouter ici du code pour rediriger ou montrer un message de succès
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
