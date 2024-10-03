import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { Products } from '../../../utils/interfaces/product';
import { ProductCategories } from '../../../utils/interfaces/productCategory';
import { User } from '../../../utils/interfaces/user';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from '../product-category/product-category.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductDetailsComponent, MatCardModule, RouterLink,CommonModule,ProductCategoryComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  api = inject(ApiService);
  auth = inject(AuthService);
  products: Products = [] as Products;
  user: User = {} as User;
  productCategories: ProductCategories = [] as ProductCategories;


  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.api.getUser().subscribe({
        next: (user) => {
          if (user && user.EnterpriseId) {
            this.user = user;

            this.api.getProducts().subscribe({
              next: (allProducts) => {
                this.products = allProducts.filter(product => product.EnterpriseId !== user.EnterpriseId);
                this.loadProductImages();
              },
              error: (error) => {
                console.error('Erreur lors de la récupération des produits :', error);
              }
            });
          } else {
            console.log('L’utilisateur n’a pas d’EnterpriseId.');
          }
        },
        error: (error) => {
          // Gérer l'erreur, par exemple en affichant un message ou en redirigeant
          console.error('Erreur lors de la récupération de l’utilisateur :', error);
        }
      });
    } else {
      this.api.getProducts().subscribe({
        next: (allProducts) => {
          this.products = allProducts;
          this.loadProductImages();
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des produits :', error);
        }
      });
    }

    this.api.getProductCategories().subscribe((productCategories) => {
      this.productCategories = productCategories;
    })
  }


  private loadProductImages(): void {
    this.products.forEach(product => {
      this.api.getProductImages(product.id).subscribe(images => {
        product.firstImage = images.length > 0 ? images[0].url : 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
      });
    });
  }



}
