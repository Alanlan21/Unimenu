import { Col } from 'sequelize/types/utils';
import { ProductOrder } from 'src/product-order/product-order.entity';
import { Store } from 'src/store/store.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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

  @Column({ default: 0 })
  stock: number; 
  

  @ManyToOne(() => Store, store => store.menuItems)
  store: Store;

<<<<<<< HEAD
  @OneToMany(() => ProductOrder, (productOrder) => productOrder.menuItem) // Relacionamento com ProductOrder
=======
  @OneToMany(() => ProductOrder, productOrder => productOrder.menuItem) // Relacionamento com ProductOrder
>>>>>>> c0afe41a7bdc310fe963ab6d6f3e90ca605bfd17
  productOrders: ProductOrder[];
 }
