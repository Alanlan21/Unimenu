import { Order } from '../order/order.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    cpf: string;
    phone: string;
    gender: string;
    birthDate: Date;
    orders: Order[];
}
