import { BaseEntity } from 'src/models/base/entities/base.entity';
import {
  Product,
  ProductDocument,
} from 'src/models/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Cart, CartDocument } from './cart.entity';

@Entity({ name: 'cart_item' })
export class CartItem extends BaseEntity {
  @ManyToOne(() => Product, (product) => product.productId)
  @JoinColumn()
  product: ProductDocument;

  @Column({ type: 'float8', default: 1, nullable: false })
  quantity: number;

  @Column({ type: 'float8', default: 0, nullable: false })
  totalPrice: number;

  @ManyToOne(() => Cart, (cart) => cart.id)
  cart: CartDocument;
}

export type CartItemDocument = CartItem & BaseEntity;
