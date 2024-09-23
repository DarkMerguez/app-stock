import { Component, inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../utils/interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatCardModule,RouterLink,MatIconModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  authService = inject(AuthService);

  isAdmin = this.authService.isAdmin();

  product: Product = {} as Product;

  @Input() id: number = 0;

  private api = inject(ApiService);
  private router = inject(Router);

  onEdit(productId: number): void {
    // Logique pour modifier le produit, par exemple, rediriger vers le formulaire de modification
    console.log(`Modifier le produit avec l'ID: ${productId}`);
    // Par exemple, vous pouvez rediriger avec le routeur :
    // this.router.navigate(['/edit-product', productId]);
  }

  onDelete(productId: number) {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
    if (confirmDelete) {
      this.api.deleteProduct(productId).subscribe(
        () => {
          console.log("Produit supprimé");
          this.router.navigate(["/admin-board"]);
        },
        (error) => {
          console.error("Erreur lors de la suppression du produit", error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.api.getProductById(this.id).subscribe((product: Product) => {
      this.product = product;
    });
  }

}
