import { TransactionStatus } from 'src/constants';
import {
  Address,
  AddressDocument,
} from 'src/models/addresses/entities/address.entity';
import { BaseEntity } from 'src/models/base/entities/base.entity';
import { Cart, CartDocument } from 'src/models/carts/entities/cart.entity';

import { User, UserDocument } from 'src/models/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'transaction' })
export class Transaction extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  transactionId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: UserDocument;

  @OneToOne(() => Cart, (cart) => cart.id)
  @JoinColumn()
  cart: CartDocument;

  @Column({
    type: 'varchar',
    length: 100,
    default: TransactionStatus.PENDING,
    nullable: false,
  })
  status: TransactionStatus;

  @Column({ type: 'float8', default: 0, nullable: false })
  totalPrice: number;

  @ManyToOne(() => Address, (address) => address.id)
  @JoinColumn()
  address: AddressDocument;
}

export type TransactionDocument = Transaction & BaseEntity;
