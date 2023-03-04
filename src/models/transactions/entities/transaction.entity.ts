import { TransactionStatus } from 'src/constants';
import {
  Address,
  AddressDocument,
} from 'src/models/addresses/entities/address.entity';
import { BaseEntity } from 'src/models/base/entities/base.entity';

import { User, UserDocument } from 'src/models/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import {
  TransactionToProduct,
  TransactionToProductDocument,
} from './transactionToProduct.entity';

@Entity({ name: 'transaction' })
export class Transaction extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ type: 'float8', default: 0 })
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.id)
  user: UserDocument;

  @OneToOne(() => Address, (address) => address.id)
  @JoinColumn()
  address: AddressDocument;

  @OneToMany(
    () => TransactionToProduct,
    (transactionToProduct) => transactionToProduct.id,
  )
  transactionToProduct: TransactionToProductDocument[];
}

export type TransactionDocument = Transaction & BaseEntity;
