import { Component, inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Products } from '../../../utils/interfaces/product';
import { ProductCategory } from '../../../utils/interfaces/productCategory';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsListComponent } from '../products-list/products-list.component';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../utils/interfaces/user';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [RouterLink,ProductsListComponent,MatCardModule],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent implements OnInit {

  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  products: Products = [];
  productCategory: ProductCategory | null = null;
  productCategoryId: number = 0;
  user: User = {} as User;

  ngOnInit(): void {

    this.api.getUser().subscribe((user) => {
      this.user = user;
    });


    // Récupérer l'ID du produit depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productCategoryId = +id;
        this.api.getProductsByCategory(this.productCategoryId).subscribe((products: Products) => {
          this.products = products;
          this.products.forEach(product => {
            this.api.getProductImages(product.id).subscribe(images => {
              // Stocke la première image si elle existe, sinon utilise l'image par défaut
              product.firstImage = images.length > 0 ? images[0].url : 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
            });
          });
        })
        this.api.getProductCategoryById(this.productCategoryId).subscribe((productCategory) => {
          this.productCategory = productCategory
        })
      }
    });
  }



}
