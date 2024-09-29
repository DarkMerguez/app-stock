import { Component, inject, Input } from '@angular/core';
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
  imports: [RouterLink,MatCardModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  private api = inject(ApiService);

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
      })
    }

      this.api.getProducts().subscribe((products: Products) => {
        this.products = products;
  
        this.products.forEach(product => {
          this.api.getProductImages(product.id).subscribe(images => {
            // Stocke la première image si elle existe, sinon utilise l'image par défaut
            product.firstImage = images.length > 0 ? images[0].url : 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
          });
        });
  
      });
      this.api.getUser().subscribe((user: User) => {
        this.user = user;
      });
  }

}
