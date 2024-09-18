import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ProductsListComponent } from "../../products-list/products-list.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductsListComponent, AsyncPipe, ProductDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent { // implements OnInit {

  private api = inject(ApiService);

  products$ = this.api.getProducts();


/*   ngOnInit(): void {
    this.getProducts().subscribe((products) => {
      this.products = products;
    });
  } */

}