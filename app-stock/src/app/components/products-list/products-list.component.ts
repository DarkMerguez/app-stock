import { Component, input } from "@angular/core";
import { Product, Products } from "../../../utils/interfaces/product";
import { DashboardComponent } from "../dashboard/dashboard.component";
import {MatCardModule} from '@angular/material/card';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [DashboardComponent, MatCardModule, ProductDetailsComponent,RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  product = null

  items = input<Products>();

}
