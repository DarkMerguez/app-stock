export interface User {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    ImageId: number;
    EnterpriseId: number;
}

export type Users = User[];