import { Component, inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../utils/interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Images } from '../../../utils/interfaces/image';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { User } from '../../../utils/interfaces/user';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatCardModule, RouterLink, MatIconModule, CarouselModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  private api = inject(ApiService);
  private router = inject(Router);
  private auth = inject(AuthService);

  isAdmin = this.auth.isAdmin();
  isGestionnaire = this.auth.isGestionnaire();
  isLoggedIn: Boolean = this.auth.isLoggedIn();

  product: Product = {} as Product;
  productImages: Images = [] as Images;
  user: User = {} as User;

  @Input() id: number = 0;



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

  currentIndex: number = 0;

  nextSlide(): void {
    if (this.productImages.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.productImages.length; // Boucle à la première image
    }
  }

  prevSlide(): void {
    if (this.productImages.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.productImages.length) % this.productImages.length; // Boucle à la dernière image
    }
  }

  ngOnInit(): void {

    if (this.auth.isLoggedIn()) {
      this.api.getUser().subscribe((user) => {
        this.user = user;
      })
    }

    this.api.getProductById(this.id).subscribe((product: Product) => {
      this.product = product;

      // Récupération des images du produit
      this.api.getProductImages(this.product.id).subscribe((productImages: Images) => {
        this.productImages = productImages;
        console.log(productImages)
      });
    });
  }

}
