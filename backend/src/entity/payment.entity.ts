import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { PaymentMethod } from './payment-method.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.payments)
  paymentMethod: PaymentMethod;
}
