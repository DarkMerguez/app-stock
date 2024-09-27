import { Component, inject, OnInit } from '@angular/core';
import { Products } from '../../../utils/interfaces/product';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../utils/interfaces/user';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-products-list',
  standalone: true,
  imports: [MatCardModule,MatIcon,NgFor,RouterLink],
  templateUrl: './admin-products-list.component.html',
  styleUrl: './admin-products-list.component.css'
})
export class AdminProductsListComponent implements OnInit {
  products: Products = [];

  private api = inject(ApiService);
  user: User = {} as User;

  ngOnInit(): void {
    this.api.getProducts().subscribe((products: Products) => {
      this.products = products;
    });
    this.api.getUser().subscribe((user : User) => {
      this.user = user;
    });
  }

}
