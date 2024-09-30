import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit {

  private router = inject(Router);

  ngOnInit() {
    // Vider le panier local ou rediriger l'utilisateur vers une page différente
    console.log('Paiement réussi, panier vidé');
    // Exemple : rediriger l'utilisateur après quelques secondes
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 3000);
  }

}
