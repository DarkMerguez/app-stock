import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Products } from '../../../utils/interfaces/product';
import { Enterprises } from '../../../utils/interfaces/enterprise';
import { ProductCategories } from '../../../utils/interfaces/productCategory';
import { EnterpriseCategories } from '../../../utils/interfaces/enterpriseCategory';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../../utils/interfaces/user';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [RouterLink, MatCardModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  private api = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  @Input() text !: string;

  searchedProducts: Products = [] as Products;
  searchedEnterprises: Enterprises = [] as Enterprises;
  searchedProductCategories: ProductCategories = [] as ProductCategories;
  searchedEnterpriseCategories: EnterpriseCategories = [] as EnterpriseCategories;
  user: User = {} as User;
  products: Products = [] as Products;


  ngOnInit(): void {
    if (this.text) {
      this.api.search(this.text).subscribe((results) => {
        this.searchedProducts = results.products;
        this.searchedEnterprises = results.enterprises;
        this.searchedProductCategories = results.productCategories;
        this.searchedEnterpriseCategories = results.enterpriseCategories;

        this.searchedProducts.forEach(product => {
          this.api.getProductImages(product.id).subscribe(images => {
            console.log(`Images for product ${product.id}:`, images);
            // Utilise l'image par défaut si aucune image n'est trouvée
            if (images && images.length > 0) {
              product.firstImage = images[0].url;
            } else {
              product.firstImage = 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
            }
            this.cdr.detectChanges(); // Forcer la détection des changements si nécessaire
          });
        });
      })
    }

    this.api.getProducts().subscribe((products: Products) => {
      this.products = products;
    });

    this.api.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

}
