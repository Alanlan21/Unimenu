import { Col } from 'sequelize/types/utils';
import { ProductOrder } from './product-order.entity';
import { Store } from './store.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  category: string; // lactose, gluten, vegano

  @ManyToOne(() => Store, (store) => store.menuItems)
  store: Store;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.menuItem) // Relacionamento com ProductOrder
  productOrders: ProductOrder[];
}
