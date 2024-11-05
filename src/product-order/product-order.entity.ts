import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from 'src/order/order.entity';
import { MenuItem } from 'src/menuItem/menuItem.entity';

@Entity()
export class ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

<<<<<<< HEAD
  @ManyToOne(() => MenuItem , (menuItem) => menuItem.productOrders)
  menuItem: MenuItem;

  @ManyToOne(() => Order, (order) => order.productOrders)
=======
  @ManyToOne(() => MenuItem , menuItem => menuItem.productOrders)
  menuItem: MenuItem;

  @ManyToOne(() => Order, order => order.productOrders)
>>>>>>> c0afe41a7bdc310fe963ab6d6f3e90ca605bfd17
  order: Order;
}
