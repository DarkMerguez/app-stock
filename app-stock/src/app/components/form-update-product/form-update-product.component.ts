import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../utils/interfaces/product';
import { Image } from '../../../utils/interfaces/image';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductCategories } from '../../../utils/interfaces/productCategory';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-update-product',

  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe,RouterLink,CommonModule],
  templateUrl: './form-update-product.component.html',
  styleUrls: ['./form-update-product.component.css']
})
export class FormUpdateProductComponent implements OnInit {
  productGroup: FormGroup;
  existingImages: Image[] = []; // Tableau pour stocker les images existantes
  imagesToDelete: number[] = []; // Tableau pour stocker les IDs des images à supprimer
  productCategories$: Observable<ProductCategories>;
  productId!: number; // Assurez-vous d'initialiser avec l'ID du produit à modifier

  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.productGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      ProductCategoryId: new FormControl('', [Validators.required])
    });

    this.productCategories$ = this.api.getProductCategories();
  }


  ngOnInit(): void {
    // Récupérer l'ID du produit depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id; // Convertir l'ID en nombre
        this.loadProduct(); // Appeler loadProduct pour charger le produit
      }
    });
  }

  loadProduct() {
    this.api.getProductById(this.productId).subscribe((product: Product) => {
      this.productGroup.patchValue({
        name: product.name,
        price: product.price,
        description: product.description,
        stock: product.stock,
        ProductCategoryId: product.ProductCategoryId,
      });

      // Récupérer les images associées via la table de jointure
      this.api.getProductImages(this.productId).subscribe((images: Image[]) => {
        this.existingImages = images; // Assurez-vous que votre méthode renvoie les images
      });
    });
  }

  
  onDeleteImage(imageId: number) {
    this.imagesToDelete.push(imageId); // Ajouter l'image à la liste des images à supprimer
  }
  
  removeImage(imageId: number) {
    this.onDeleteImage(imageId); // Ajouter l'image à la liste des images à supprimer
    this.existingImages = this.existingImages.filter(image => image.id !== imageId); // Mettre à jour la liste visible des images
  }

  onSubmit() {
  const formData = new FormData();
  
  formData.append('name', this.productGroup.get('name')?.value ?? '');
  formData.append('price', (this.productGroup.get('price')?.value ?? 0).toString());
  formData.append('description', this.productGroup.get('description')?.value ?? '');
  formData.append('stock', (this.productGroup.get('stock')?.value ?? 0).toString());
  formData.append('ProductCategoryId', this.productGroup.get('ProductCategoryId')?.value ?? '');

  // Ajouter les nouvelles images au FormData
  const fileInput = document.getElementById('images') as HTMLInputElement;
  if (fileInput && fileInput.files) {
    Array.from(fileInput.files).forEach(file => {
      formData.append('images', file);
    });
  }

  // Ajouter les images à supprimer au FormData
  formData.append('imagesToDelete', JSON.stringify(this.imagesToDelete));

  // Envoyer la requête de mise à jour du produit
  this.api.updateProduct(this.productId, formData).subscribe({
    next: (response) => {
      console.log('Produit mis à jour avec succès', response);
      this.imagesToDelete = [];  // Réinitialiser la liste des images à supprimer après la soumission
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour du produit', err);
    }
  });
}
}