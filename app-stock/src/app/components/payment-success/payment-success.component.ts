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
    console.log('Paiement réussi, panier vidé');
    // rediriger l'utilisateur après 3 secondes
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 3000);
  }

}
