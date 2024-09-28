import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ProductsListComponent } from "../products-list/products-list.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { RouterLink } from "@angular/router";
import { User } from "../../../utils/interfaces/user";
import { MatCardModule } from "@angular/material/card";
import { Products } from "../../../utils/interfaces/product";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductsListComponent, AsyncPipe, ProductDetailsComponent,RouterLink,MatCardModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  private api = inject(ApiService);
  user: User = {} as User;
  products: Products = [] as Products;

  ngOnInit(): void {
    this.api.getUser().subscribe((user: User) => {
      this.user = user;
    });

    this.api.getProducts().subscribe((products) => {
      this.products = products;

      this.products.forEach(product => {
        this.api.getProductImages(product.id).subscribe(images => {
          // Stocke la première image si elle existe, sinon utilise l'image par défaut
          product.firstImage = images.length > 0 ? images[0].url : 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
        });
      });
    });
  }

  products$ = this.api.getProducts();


/*   ngOnInit(): void {
    this.getProducts().subscribe((products) => {
      this.products = products;
    });
  } */

}