import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from 'src/order/order.entity';
import { MenuItem } from 'src/menuItem/menuItem.entity';

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
