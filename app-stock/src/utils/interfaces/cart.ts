export interface Cart {
    id?: number;
    isPaid: boolean;
    totalPrice: number;
    EnterpriseId?: number;
}

export type Carts = Cart[];