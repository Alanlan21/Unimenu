import { MenuItem } from '../types/MenuItem';

export interface CreateOrderDTO {
  order_number: number;
  order_date: Date;
  order_status: string;
  customer_id: number;
}

export interface Order {
  id: number;
  order_number: number;
  order_date: Date;
  status: string;
  user: {
    id: number;
  };
  productOrders: ProductOrder[];
  payments: Payment[];
}

export interface ProductOrder {
  id: number;
  quantity: number;
  menuItem: MenuItem;
  order: Order;
}

export interface Payment {
  id: number;
  amount: number;
  status: string;
  paymentDate: Date;
  order: Order;
}

export interface CreatePaymentDTO {
  id: number;
  value: number;
  orderId: number;
  PaymentMethodId: number;
}
