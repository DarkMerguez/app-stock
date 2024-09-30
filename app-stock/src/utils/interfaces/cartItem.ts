export interface CartItem {
    product: {
      name: string;
      price: number;
      stock: number;
    };
    quantity: number;
  }

  export type CartItems = CartItem[];