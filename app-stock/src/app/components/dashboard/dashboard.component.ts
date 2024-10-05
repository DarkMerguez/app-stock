import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject, OnInit, Renderer2 } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { AuthService } from "../../../services/auth.service";
import { BillService } from "../../../services/bill.service";
import { OrderService } from "../../../services/order.service";
import { Products } from "../../../utils/interfaces/product";
import { User } from "../../../utils/interfaces/user";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { ProductsListComponent } from "../products-list/products-list.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductsListComponent, AsyncPipe, ProductDetailsComponent, RouterLink, MatCardModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  private api = inject(ApiService);
  private orderService = inject(OrderService);
  private auth = inject(AuthService);
  private billService = inject(BillService);
  private renderer = inject(Renderer2);

  user: User = {} as User;
  products: Products = [] as Products;
  orders: any[] = [];
  buyerId: number = 0;
  receivedOrders: any[] = [];
  sentOrders: any[] = [];
  displayedReceivedOrders = 3;
  displayedSentOrders = 3;
  productsOfCurrentUserEnterprise: Products = [] as Products;
  favoriteProducts: Products = [] as Products;



  ngOnInit(): void {
    this.api.getUser().subscribe((user: User) => {
      this.user = user;
      if (user.EnterpriseId) {
        this.api.getFavoriteProducts(user.EnterpriseId).subscribe((favoriteProducts) => {
          this.favoriteProducts = favoriteProducts;
          console.log(favoriteProducts);

          this.favoriteProducts.forEach(product => {
            this.api.getProductImages(product.id).subscribe(images => {
              // Stocker la première image ou une image par défaut
              product.firstImage = images.length > 0 ? images[0].url : 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
            });
          });
        });
      }
    });

    this.buyerId = this.auth.getUserEnterpriseId();

    this.api.getProducts().subscribe((products) => {
      this.products = products;

      this.products.forEach(product => {
        this.api.getProductImages(product.id).subscribe(images => {
          // Stocke la première image si elle existe, sinon utilise l'image par défaut
          product.firstImage = images.length > 0 ? images[0].url : 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
        });
      });
      this.products.forEach(product => {
        if (product.EnterpriseId === this.user.EnterpriseId) {
          this.productsOfCurrentUserEnterprise.push(product);
        }
      })
    });



    this.loadOrders();
  }

  products$ = this.api.getProducts();


  loadOrders(): void {
    if (this.buyerId) {
      this.orderService.getOrders(this.buyerId).subscribe(orders => {
        this.orders = orders;

        this.receivedOrders = this.orders.filter(order => order.sellerId === this.user.EnterpriseId);
        this.sentOrders = this.orders.filter(order => order.buyerId === this.user.EnterpriseId);

        this.receivedOrders.forEach(order => {
          this.api.getEnterpriseNameById(order.sellerId).subscribe(name => {
            order.enterpriseName = name; // Récupère le nom de l'entreprise vendeuse
          });
        });

        this.sentOrders.forEach(order => {
          this.api.getEnterpriseNameById(order.buyerId).subscribe(name => {
            order.enterpriseName = name; // Récupère le nom de l'entreprise acheteuse
          });
        });
      });
    }
  }

  validateOrder(orderId: number): void {
    this.orderService.updateOrderStatus(orderId, 'Validated').subscribe(() => {
      this.loadOrders(); // Recharger les commandes après la mise à jour du statut
    });
  }

  shipOrder(orderId: number): void {
    this.orderService.updateOrderStatus(orderId, 'Shipped').subscribe(() => {
      this.loadOrders();
    });
  }

  confirmReceipt(orderId: number): void {
    this.orderService.updateOrderStatus(orderId, 'Finished').subscribe(() => {
      this.loadOrders();
    });
  }

  generateBill(orderId: number) {
    this.billService.generateBill(orderId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: (error) => {
        console.error('Error generating bill:', error);
      }
    });
  }
  getColor(status: string): string {
    switch (status) {
      case 'WaitingForValidation':
        return 'orangered';
      case 'Validated':
        return 'green';
      case 'Shipped':
        return 'blue';
      case 'Finished':
        return 'gray';
      default:
        return 'black';
    }
  }

  loadMoreReceived() {
    this.displayedReceivedOrders += 10;
  }

  loadMoreSent() {
    this.displayedSentOrders += 10;
  }



}