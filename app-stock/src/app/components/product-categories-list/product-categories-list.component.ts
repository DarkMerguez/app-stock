import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ProductCategories } from '../../../utils/interfaces/productCategory';
import { RouterLink } from '@angular/router';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ProductsListComponent } from '../products-list/products-list.component';


@Component({
  selector: 'app-product-categories-list',
  standalone: true,
  imports: [RouterLink,ProductsListComponent,ProductCategoryComponent],
  templateUrl: './product-categories-list.component.html',
  styleUrl: './product-categories-list.component.css'
})
export class ProductCategoriesListComponent implements OnInit {

  private api = inject(ApiService)

  productCategories: ProductCategories = [] as ProductCategories;

  ngOnInit(): void {

    this.api.getProductCategories().subscribe((categories: ProductCategories) => {
      this.productCategories = categories;
    });

  }

}
