import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { MenuItem } from './menuItem.entity';

@Entity()
export class ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  menuItemId: number;

  @Column()
  orderId: number;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.productOrders)
  @JoinColumn({ name: 'menuItemId' })
  menuItem: MenuItem;

  @ManyToOne(() => Order, (order) => order.productOrders)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
