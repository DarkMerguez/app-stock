import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ProductsListComponent } from "../products-list/products-list.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { RouterLink } from "@angular/router";
import { User } from "../../../utils/interfaces/user";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductsListComponent, AsyncPipe, ProductDetailsComponent,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  private api = inject(ApiService);
  user: User = {} as User;

  ngOnInit(): void {
    this.api.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  products$ = this.api.getProducts();


/*   ngOnInit(): void {
    this.getProducts().subscribe((products) => {
      this.products = products;
    });
  } */

}