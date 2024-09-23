import { Component, inject, OnInit } from '@angular/core';
import { Product, Products } from '../../../utils/interfaces/product';
import { ApiService } from '../../../services/api.service';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterLink,
    MatCard, 
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    ProductDetailsComponent,
    MatCardHeader,
    MatCardModule,
    CommonModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Products = []; // Déclarez un tableau de produits

  private api = inject(ApiService);

  ngOnInit(): void {
    this.api.getProducts().subscribe((data: Products) => {
      this.products = data;
    });
  }
}
