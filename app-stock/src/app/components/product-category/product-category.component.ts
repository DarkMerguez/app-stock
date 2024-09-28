import { Component, inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Products } from '../../../utils/interfaces/product';
import { ProductCategory } from '../../../utils/interfaces/productCategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent implements OnInit {

  private api = inject(ApiService);

  products: Products = [];
  productCategory: ProductCategory | null = null;
  @Input() productCategoryId: number | any = 0;

  ngOnInit(): void {

    this.api.getProductCategoryById(this.productCategoryId).subscribe((productCategory: ProductCategory) => {
      this.productCategory = productCategory;
    });
    
    this.api.getProductsByCategory(this.productCategoryId).subscribe((products: Products) => {
      this.products = products;
    })

  }

  

}
