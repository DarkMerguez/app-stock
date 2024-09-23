import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Products } from '../../../utils/interfaces/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MatCardModule,RouterLink,MatIconModule,NgFor],
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
