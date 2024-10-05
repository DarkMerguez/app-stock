export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    ProductCategoryId: string;
    isFavorite: boolean;
    EnterpriseId?: number;
    firstImage?: string;
    quantityBought?: number
}

export type Products = Product[];