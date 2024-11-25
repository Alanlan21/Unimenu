import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Payment } from '../payment/payment.entity';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nome do método de pagamento (ex: "Cartão de Crédito")

  @OneToMany(() => Payment, (payment) => payment.paymentMethod)
  payments: Payment[]; // Relacionamento com a entidade Payment
}
