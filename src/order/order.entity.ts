<<<<<<< HEAD
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
=======
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
>>>>>>> c0afe41a7bdc310fe963ab6d6f3e90ca605bfd17
import { User } from 'src/user/user.entity'; // Importando a entidade User
import { Payment } from 'src/payment/payment.entity';
import { ProductOrder } from 'src/product-order/product-order.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_number: number;

  @Column()
  order_date: Date;

  @Column()
<<<<<<< HEAD
  status: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
=======
  order_status: string;

  @ManyToOne(() => User, user => user.orders) 
  user: User; 
>>>>>>> c0afe41a7bdc310fe963ab6d6f3e90ca605bfd17

  @OneToMany(() => Payment, payment => payment.order) 
  payments: Payment[]; 

<<<<<<< HEAD
  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
=======
  @OneToMany(() => ProductOrder, productOrder => productOrder.order)
>>>>>>> c0afe41a7bdc310fe963ab6d6f3e90ca605bfd17
  productOrders: ProductOrder[];
}

