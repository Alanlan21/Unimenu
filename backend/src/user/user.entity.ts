import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({})
  email: string;

  @Column()
  confirmEmail: string;

  @Column()
  password: string;

  @Column()
  confirmPassword: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
