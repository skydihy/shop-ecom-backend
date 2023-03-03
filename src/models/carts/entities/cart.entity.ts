import { BaseEntity } from 'src/models/base/entities/base.entity';
import {
  Transaction,
  TransactionDocument,
} from 'src/models/transactions/entities/transaction.entity';
import { User, UserDocument } from 'src/models/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CartItem, CartItemDocument } from './cartItem.entity';

@Entity({ name: 'cart' })
export class Cart extends BaseEntity {
  @OneToMany(() => CartItem, (item) => item.id)
  @JoinColumn()
  cartItem: CartItemDocument[];

  @Column({ type: 'float8', default: 1, nullable: false })
  amount: number;

  @Column({ type: 'float8', default: 0, nullable: false })
  price: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  isConfirm: boolean;

  @OneToOne(() => Transaction, (transaction) => transaction.id)
  transaction: TransactionDocument;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: UserDocument;
}

export type CartDocument = Cart & BaseEntity;
