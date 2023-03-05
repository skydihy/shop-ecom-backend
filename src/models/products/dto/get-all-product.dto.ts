import { BaseDto } from '@/models/base/dto/base.dto';
import { instanceToPlain, Expose, Transform } from 'class-transformer';
import { ProductCategoryDto } from './product-category.dto';

export class GetAllProductDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  stock: number;

  @Expose()
  @Transform(({ obj }) => instanceToPlain(obj.category))
  category: ProductCategoryDto;
}
