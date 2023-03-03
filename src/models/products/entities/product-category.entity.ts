import { BaseEntity } from 'src/models/base/entities/base.entity';
import {
  Product,
  ProductDocument,
} from 'src/models/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'product_category' })
export class ProductCategory extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.id)
  products: ProductDocument[];
}

export type ProductCategoryDocument = ProductCategory & BaseEntity;
