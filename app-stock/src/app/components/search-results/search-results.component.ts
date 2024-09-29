import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Enterprises } from '../../../utils/interfaces/enterprise';
import { EnterpriseCategories } from '../../../utils/interfaces/enterpriseCategory';
import { Image } from '../../../utils/interfaces/image';
import { Products } from '../../../utils/interfaces/product';
import { ProductCategories } from '../../../utils/interfaces/productCategory';

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
  private sanitizer = inject(DomSanitizer);

  @Input() text !: string;

  searchedProducts: Products = [] as Products;
  searchedEnterprises: Enterprises = [] as Enterprises;
  searchedProductCategories: ProductCategories = [] as ProductCategories;
  searchedEnterpriseCategories: EnterpriseCategories = [] as EnterpriseCategories;
  products: Products = [] as Products;
  imageEnterprise : Image = {} as Image;


  ngOnInit(): void {
    if (this.text) {
      this.api.search(this.text).subscribe((results) => {
        this.searchedProducts = results.products;
        this.searchedEnterprises = results.enterprises;
        this.searchedProductCategories = results.productCategories;
        this.searchedEnterpriseCategories = results.enterpriseCategories;

        this.searchedProducts.forEach(product => {
          this.api.getProductImages(product.id).subscribe(images => {
            // Utilise l'image par défaut si aucune image n'est trouvée
            if (images && images.length > 0) {
              product.firstImage = images[0].url;
            } else {
              product.firstImage = 'https://maisonsartre.fr/images/com_hikashop/upload/visuel-produit-manquant.png';
            }
            this.cdr.detectChanges(); // Forcer la détection des changements si nécessaire
          });
        });

        this.searchedEnterprises.forEach(enterprise => {
          this.api.getImageById(enterprise.ImageId).subscribe((imageEnterprise) => {
            this.imageEnterprise = imageEnterprise;
          })
        })
      })
    }

    this.api.getProducts().subscribe((products: Products) => {
      this.products = products;
    });
  }

    // Méthode qui met en surbrillance les termes recherchés
    highlightSearchTerm(text: string): SafeHtml {
      const searchTerm = this.text ? this.text : '';
      const regex = new RegExp(searchTerm, 'gi'); // Regex pour toutes les occurrences
      const highlightedText = text.replace(regex, (match) => `<mark>${match}</mark>`);
      return this.sanitizer.bypassSecurityTrustHtml(highlightedText); // Sécurise le HTML
    }

}
