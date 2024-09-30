import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../../services/payment.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { CartItems } from '../../../utils/interfaces/cartItem';
import { Enterprise } from '../../../utils/interfaces/enterprise';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule,MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: CartItems = [] as CartItems;
  totalPrice = 0;
  cartId: number = 0;
  enterprise: Enterprise = {} as Enterprise;
  enterpriseId = 0;


  private paymentService = inject(PaymentService);
  private cartService = inject(CartService);
  private api = inject(ApiService);
  private auth = inject(AuthService);

  ngOnInit(): void {
    this.enterpriseId = this.auth.getUserEnterpriseId();
    this.api.getEnterpriseById(this.enterpriseId).subscribe((enterprise) => {
      this.enterprise = enterprise;

      // Appeler la nouvelle méthode pour obtenir les détails du panier
      this.cartService.getCartDetails(this.enterpriseId).subscribe((cart) => {
        this.cartId = cart.cartId;
        // Adapter les données pour les faire correspondre à l'interface CartItem
        this.cartItems = cart.items.map((item: any) => ({
          product: {
            name: item.name,
            price: item.price,
            stock: item.stock
          },
          quantity: item.quantity
        }));
        this.totalPrice = cart.totalPrice || 0;
      });
    });
  }

  // Méthode pour mettre à jour le panier et recalculer le total
  updateCart(item: any): void {
    // Vérifie que la quantité ne dépasse pas le stock disponible
    if (item.quantity > item.product.stock) {
      item.quantity = item.product.stock;
    }

    // Recalculer le total du panier
    this.totalPrice = this.cartItems.reduce((acc, currentItem) => {
      return acc + currentItem.product.price * currentItem.quantity;
    }, 0);

  }

  // Méthode pour supprimer un produit du panier
removeFromCart(item: any): void {
  // Retirer l'élément du tableau cartItems
  this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);

  // Recalculer le total après la suppression
  this.totalPrice = this.cartItems.reduce((acc, currentItem) => {
      return acc + currentItem.product.price * currentItem.quantity;
  }, 0);
}

  // Déclenche le paiement Stripe
  async checkout() {
    const stripe = await loadStripe('pk_test_51Q4VQxIKWrT6xOX8TweTULvLKwwWXyQHcCXFELTyFNqApFt2S7S4RIOZZnhDSpdgNqFqHGKME2l6hOsJqg0JpQVG00CpBC2PTt');

    if (!stripe) {
      console.error('Stripe n\'a pas pu être chargé.');
      return;
    }

    this.paymentService.createCheckoutSession(this.cartId).subscribe(async (session) => {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (error) {
        console.error('Erreur lors du paiement avec Stripe:', error);
      }
    });
  }

}

