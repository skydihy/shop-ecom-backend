import {
  TransactionToProduct,
  TransactionToProductDocument,
} from '@/models/transactions/entities/transactionToProduct.entity';
import { BaseEntity } from 'src/models/base/entities/base.entity';

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  ProductCategory,
  ProductCategoryDocument,
} from './product-category.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description: string;

  @Column({ type: 'float8', default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => ProductCategory, (category) => category.id)
  category: ProductCategoryDocument;

  @OneToMany(
    () => TransactionToProduct,
    (transactionToProduct) => transactionToProduct.id,
  )
  transactionToProduct: TransactionToProductDocument[];
}

export type ProductDocument = Product & BaseEntity;
