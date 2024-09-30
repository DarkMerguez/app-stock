import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ProductsListComponent } from "../products-list/products-list.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { RouterLink } from "@angular/router";
import { User } from "../../../utils/interfaces/user";
import { MatCardModule } from "@angular/material/card";
import { Products } from "../../../utils/interfaces/product";
import { OrderService } from "../../../services/order.service";
import { AuthService } from "../../../services/auth.service";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductsListComponent, AsyncPipe, ProductDetailsComponent, RouterLink, MatCardModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  private api = inject(ApiService);
  private orderService = inject(OrderService);
  private auth = inject(AuthService);

  user: User = {} as User;
  products: Products = [] as Products;
  orders: any[] = [];
  buyerId: number = 0;

  ngOnInit(): void {
    this.api.getUser().subscribe((user: User) => {
      this.user = user;
    });

    this.buyerId = this.auth.getUserEnterpriseId();
    console.log(this.buyerId);

    this.api.getProducts().subscribe((products) => {
      this.products = products;

      this.products.forEach(product => {
        this.api.getProductImages(product.id).subscribe(images => {
          // Stocke la première image si elle existe, sinon utilise l'image par défaut
          product.firstImage = images.length > 0 ? images[0].url : 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
        });
      });
    });

    this.loadOrders();
  }

  products$ = this.api.getProducts();


  loadOrders(): void {
    if (this.buyerId) {
      this.orderService.getOrders(this.buyerId).subscribe(orders => {
        this.orders = orders;
        console.log(orders);
  
        // Pour chaque commande, récupérer le nom de l'entreprise
        this.orders.forEach(order => {
          this.api.getEnterpriseNameById(order.sellerId).subscribe(name => {
            order.enterpriseName = name; // Ajoutez le nom de l'entreprise à chaque commande
          });
        });
      });
    }
  }



}