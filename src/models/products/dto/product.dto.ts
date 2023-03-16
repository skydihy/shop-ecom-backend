import { Exclude, Expose, Type } from 'class-transformer';
import { BaseDto } from '@/models/base/dto/base.dto';
import { OmitType } from '@nestjs/swagger';
import { PropertyOf } from '@/types';
import { TransactionToProductDocument } from '@/models/transactions/entities/transactionToProduct.entity';
import { ProductCategoryDocument } from '../entities/product-category.entity';
import { SimpleProductCategoryDto } from './product-category.dto';

export class ProductDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  stock: number;

  @Expose()
  @Type(() => SimpleProductCategoryDto)
  category: ProductCategoryDocument;

  @Exclude()
  transactionToProduct: TransactionToProductDocument[];
}

@Exclude()
export class SimpleProduct extends OmitType(ProductDto, [
  'isActive',
  'updatedAt',
  'createdAt',
]) {
  constructor(user: PropertyOf<SimpleProduct>) {
    super(user);
    Object.assign(this, user);
  }
}
