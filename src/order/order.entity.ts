import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
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
  status: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Payment, payment => payment.order) 
  payments: Payment[]; 

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
  productOrders: ProductOrder[];
}

