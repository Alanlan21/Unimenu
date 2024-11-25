import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Store } from '../store/store.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  orgao_emissor_rg: string;

  @Column()
  dados_bancarios_banco: string;

  @Column()
  dados_bancarios_agencia: string;

  @Column()
  dados_bancarios_conta: string;

  @Column()
  dados_bancarios_digito: string;

  @OneToMany(() => Store, store => store.owner)
  stores: Store[];
}
