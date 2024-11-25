import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';
import { MenuItem } from '../menuItem/menuItem.entity';

@Entity()
export class ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => MenuItem , (menuItem) => menuItem.productOrders)
  menuItem: MenuItem;

  @ManyToOne(() => Order, (order) => order.productOrders)

  order: Order;
}
