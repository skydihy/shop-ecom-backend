import { UserRole } from 'src/constants';
import {
  Address,
  AddressDocument,
} from 'src/models/addresses/entities/address.entity';
import { BaseEntity } from 'src/models/base/entities/base.entity';
import { Cart, CartDocument } from 'src/models/carts/entities/cart.entity';
import {
  Transaction,
  TransactionDocument,
} from 'src/models/transactions/entities/transaction.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 300,
    default: UserRole.CUSTOMER,
    nullable: true,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  phoneNumber: string;

  @Column({ type: 'float8', default: 0, nullable: false })
  balance: number;

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn()
  address: AddressDocument;

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  transaction: TransactionDocument[];

  @OneToOne(() => Cart, (cart) => cart.id)
  cart: CartDocument;
}

export type UserDocument = User & BaseEntity;
