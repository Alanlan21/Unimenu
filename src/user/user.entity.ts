import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/order/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @Column()
  birthDate: Date;

  @OneToMany(() => Order, order => order.user) // Relacionamento com a entidade Order
  orders: Order[]; // Renomeado para "orders" para refletir a pluralidade
}
