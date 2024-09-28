import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Products } from '../../../utils/interfaces/product';
import { User } from '../../../utils/interfaces/user';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductDetailsComponent,MatCardModule,RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  api = inject(ApiService);
  products: Products = [] as Products;
  user: User = {} as User;

  ngOnInit(): void {

    this.api.getUser().subscribe((user) => {
      this.user = user;


      this.api.getProducts().subscribe((allProducts) => {
        for (const product of allProducts) {
          if (user.EnterpriseId !== product.EnterpriseId) {
            this.products.push(product);
          }
        };
        this.products.forEach(product => {
          this.api.getProductImages(product.id).subscribe(images => {
            // Stocke la première image si elle existe, sinon utilise l'image par défaut
            product.firstImage = images.length > 0 ? images[0].url : 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
          });
        });
        console.log(this.products)
      })
    });
  }


}
