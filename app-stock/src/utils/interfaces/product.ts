export interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
    isFavorite: boolean,
    stock: number,
    enterpriseId: number,
    productCategoryId: number
}

export type Products = Product[];