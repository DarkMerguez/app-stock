import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  standalone: true,
  imports: [],
  templateUrl: './payment-cancel.component.html',
  styleUrl: './payment-cancel.component.css'
})
export class PaymentCancelComponent implements OnInit {

  private router = inject(Router);

  ngOnInit() {
    console.log('Paiement réussi, panier vidé');
    // rediriger l'utilisateur après 3 secondes
    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 3000);
  }

}
