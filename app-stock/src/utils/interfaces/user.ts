export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
    ImageId?: number;
    EnterpriseId?: number;
}

export type Users = User[];