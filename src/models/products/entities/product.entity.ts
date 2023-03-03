import { BaseEntity } from 'src/models/base/entities/base.entity';
import { Cart, CartDocument } from 'src/models/carts/entities/cart.entity';
import { CartItem } from 'src/models/carts/entities/cartItem.entity';

import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import {
  ProductCategory,
  ProductCategoryDocument,
} from './product-category.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  productId: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description: string;

  @Column({ type: 'float8', default: 0, nullable: false })
  price: number;

  @Column({ type: 'float8', default: 0, nullable: false })
  stockQuantity: number;

  @Column({ type: 'float8', default: 0, nullable: true })
  discountPrice: number;

  @Column({ type: 'boolean', default: false, nullable: true })
  isDiscount: boolean;

  @OneToMany(() => CartItem, (cart) => cart.id)
  carts: CartDocument[];

  @ManyToOne(() => ProductCategory, (category) => category.id)
  @JoinColumn()
  category: ProductCategoryDocument;
}

export type ProductDocument = Product & BaseEntity;
