import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../../../services/api.service";
import { Products } from "../../../utils/interfaces/product";
import { ProductsListComponent } from "../../products-list/products-list.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductsListComponent, AsyncPipe],
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