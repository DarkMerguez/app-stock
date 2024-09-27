import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Products } from '../../../utils/interfaces/product';
import { NgFor } from '@angular/common';
import { User } from '../../../utils/interfaces/user';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MatCardModule, RouterLink, MatIconModule, NgFor],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {

  private api = inject(ApiService);
  user: User = {} as User;
  products: Products = [] as Products;

  ngOnInit(): void {
    this.api.getProducts().subscribe((products: Products) => {
      this.products = products;

      this.products.forEach(product => {
        this.api.getProductImages(product.id).subscribe(images => {
          // Stocke la première image si elle existe, sinon utilise l'image par défaut
          product.firstImage = images.length > 0 ? images[0].url : 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
        });
      });

    });
    this.api.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }
}
