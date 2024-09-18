import { Component, inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {MatCardModule} from '@angular/material/card';
import { Product } from '../../../utils/interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatCardModule,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product: Product = {} as Product;

  @Input() id: number = 0;

  private api = inject(ApiService);

  ngOnInit(): void {
    this.api.getProductById(this.id).subscribe((product: Product) => {
      this.product = product;
    });
  }

}
