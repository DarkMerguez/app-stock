export interface Enterprise {
    id?: number;
    name: string;
    address: string;
    siret: number;
    ImageId: number;
    EnterpriseCategoryId: number;
}

export type Enterprises = Enterprise[];