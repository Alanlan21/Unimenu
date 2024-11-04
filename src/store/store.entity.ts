import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { MenuItem } from 'src/menuItem/menuItem.entity';
import { Owner } from 'src/owner/owner.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  CNPJ: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => MenuItem, menuItem => menuItem.store)
  menuItems: MenuItem[];

  @ManyToOne(() => Owner, owner => owner.stores, { nullable: false, onDelete: 'CASCADE' })
  owner: Owner;
}
