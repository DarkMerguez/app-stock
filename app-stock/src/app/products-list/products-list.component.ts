import { Component, input } from "@angular/core";
import { Products } from "../../utils/interfaces/product";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [DashboardComponent, MatCardModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {



  items = input<Products>();

}
