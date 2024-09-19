import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, Products } from '../utils/interfaces/product';
import { Image } from '../utils/interfaces/image';
import { Observable, switchMap, tap } from 'rxjs';
import { ProductCategories } from '../utils/interfaces/productCategory';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  public getProducts(): Observable<Products> {
    return this.http.get<Products>("http://localhost:8051/products");
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>("http://localhost:8051/product/" + id);
  }

  public getProductCategories(): Observable<ProductCategories> {
    return this.http.get<ProductCategories>("http://localhost:8051/productcategories");
  }

 // Méthode pour uploader une image avec FormData
 public uploadImage(formData: FormData): Observable<Image> {
  return this.http.post<Image>("http://localhost:8051/upload", formData).pipe(
    tap((response) => {
      console.log('Image upload response:', response);
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

// Méthode pour uploader l'image, ajouter le produit, puis associer l'image au produit
public addProductWithImage(formData: FormData): Observable<any> {
  return this.uploadImage(formData).pipe(
    switchMap((response: any) => {
      // Assurez-vous que les valeurs sont extraites correctement
      const uploadedImageId = response.imageId;
      if (!uploadedImageId) {
        throw new Error("ImageId is missing from the response");
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
          // Assurez-vous que `createdProduct.id` et `uploadedImageId` sont définis
          if (!createdProduct.id || !uploadedImageId) {
            throw new Error("ProductId or ImageId is missing");
          }
          return this.linkProductToImage(createdProduct.id, uploadedImageId);
        })
      );
    })
  );
}



}