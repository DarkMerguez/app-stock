export interface Enterprise {
    id?: number;
    name: string;
    address: string;
    siret: number;
    iban?: number;
    ImageId: number;
    EnterpriseCategoryId: number;
}

export type Enterprises = Enterprise[];