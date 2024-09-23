import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, Products } from '../utils/interfaces/product';
import { Image } from '../utils/interfaces/image';
import { catchError, forkJoin, Observable, switchMap, tap, throwError } from 'rxjs';
import { ProductCategories } from '../utils/interfaces/productCategory';
import { EnterpriseCategories } from '../utils/interfaces/enterpriseCategory';
import { AuthService } from './auth.service';
import { User } from '../utils/interfaces/user';
import { Enterprise } from '../utils/interfaces/enterprise';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  auth = inject(AuthService);


  public getProducts(): Observable<Products> {
    return this.http.get<Products>("http://localhost:8051/products");
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>("http://localhost:8051/product/" + id);
  }

  public getProductCategories(): Observable<ProductCategories> {
    return this.http.get<ProductCategories>("http://localhost:8051/productcategories");
  }

  public getEnterpriseCategories(): Observable<EnterpriseCategories> {
    return this.http.get<EnterpriseCategories>("http://localhost:8051/enterprisecategories");
  }

  
  // Méthode pour uploader plusieurs images
  public uploadImages(formData: FormData): Observable<{ images: Image[] }> {  // Remplacez 'Image[]' par '{ images: Image[] }'
    return this.http.post<{ images: Image[] }>("http://localhost:8051/upload", formData).pipe(
      tap((response) => {
        console.log('Images upload response:', response);
      })
    );
  }
  
  // Méthode pour ajouter un produit
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>("http://localhost:8051/product", product);
  }
  
  // Méthode pour associer une image au produit dans ProductImages
  public linkProductToImage(ProductId: number, ImageId: number): Observable<any> {
    if (!ProductId || !ImageId) {
      console.error("ProductId or ImageId is missing");
      throw new Error("ProductId or ImageId is missing");
    }
    console.log('Linking ProductId:', ProductId, 'with ImageId:', ImageId);
    const payload = { ProductId, ImageId };
    return this.http.post<any>("http://localhost:8051/productImages", payload);
  }
  
  // Méthode pour uploader l'image, ajouter le produit, puis associer les images au produit
  public addProductWithImages(formData: FormData): Observable<any> {
    return this.uploadImages(formData).pipe(
      switchMap((response: { images: Image[] }) => {
        const uploadedImages = response.images;  // Accédez à la propriété 'images'
        if (!uploadedImages.length) {
          throw new Error("No images were uploaded");
        }
        
        const productData: Product = {
          name: formData.get('name') as string,
          price: parseFloat(formData.get('price') as string),
          description: formData.get('description') as string,
          stock: parseInt(formData.get('stock') as string, 10),
          ProductCategoryId: formData.get('ProductCategoryId') as string,
          id: 0, // Définir ou générer un ID par défaut si nécessaire
          isFavorite: false,
          EnterpriseId: 0, // Remplacer par la valeur correcte si nécessaire
        };
        
        return this.addProduct(productData).pipe(
          switchMap((createdProduct: Product) => {
            // Associer chaque image au produit
            const linkImageObservables = uploadedImages.map(image =>
              this.linkProductToImage(createdProduct.id, image.id)
            );
            return forkJoin(linkImageObservables);
          })
        );
      })
    );
  }
  
  // Explication de forkJoin :
  // forkJoin permet d'exécuter plusieurs observables en parallèle et d'attendre que tous soient terminés. Ici, nous l'utilisons pour lier chaque image au produit une fois celui-ci créé.
  
  
  getUser(): Observable <User> {
    const userId = this.auth.getUserId();
    return this.http.get<User>("http://localhost:8051/user/" + userId);
  }
  
  getAvatar(imageId: number): Observable<Image> {
    return this.http.get<Image>("http://localhost:8051/image/" + imageId);
  }
  
  signup(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:8051/user/signup", user);
  }


//Méthode pour uploader une seule image :
public uploadImage(formData: FormData): Observable<Image> {
  return this.http.post<Image>("http://localhost:8051/upload-single", formData).pipe(
    tap((response) => {
      console.log('Image upload response:', response);
    }),
    catchError((error) => {
      console.error('Image upload failed', error);
      return throwError(() => new Error('Image upload failed'));
    })
  );
}

// Ajouter une enterprise
public addEnterprise(enterpriseData: any): Observable<any> {
  console.log('Adding enterprise:', enterpriseData);
  return this.http.post("http://localhost:8051/enterprise", enterpriseData);
}

private getToken(): string | null {
  return localStorage.getItem('token'); 
}

// AJouter une enterprise tout en uploadant l'image associée
addEnterpriseWithImage(formData: FormData): Observable<any> {
  return this.uploadImage(formData).pipe(
    switchMap((response: any) => {
      const image = response.image;
      if (!image || !image.id) {
        throw new Error("Image upload failed");
      }
  
      // Récupérer les autres données du formulaire (sauf l'image)
      const enterpriseData: any = {
        name: formData.get('name') as string,
        address: formData.get('address') as string,
        siret: parseInt(formData.get('siret') as string, 10),  // S'assurer que le siret est un nombre
        EnterpriseCategoryId: parseInt(formData.get('EnterpriseCategoryId') as string, 10),  // S'assurer que c'est un nombre
        ImageId: image.id // Utiliser l'ID de l'image uploadée
      };

      console.log(enterpriseData);

      return this.http.post("http://localhost:8051/enterprise", enterpriseData, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`  
        }
      });
    })
  );
}


}