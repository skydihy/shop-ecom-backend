import {
  Product,
  ProductDocument,
} from '@/models/products/entities/product.entity';
import { BaseEntity } from 'src/models/base/entities/base.entity';

import { Column, Entity, ManyToOne } from 'typeorm';
import { Transaction, TransactionDocument } from './transaction.entity';

@Entity({ name: 'transaction_to_product' })
export class TransactionToProduct extends BaseEntity {
  @Column({ type: 'int4', default: 0 })
  quantity: number;

  @ManyToOne(() => Transaction, (transaction) => transaction.id)
  transaction: TransactionDocument;

  @ManyToOne(() => Product, (product) => product.id)
  product: ProductDocument;
}

export type TransactionToProductDocument = TransactionToProduct & BaseEntity;
