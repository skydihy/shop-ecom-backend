import { BaseDto } from '@/models/base/dto/base.dto';
import { PropertyOf } from '@/types';
import { PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class ProductCategoryDto extends BaseDto {
  @Expose()
  id: number;

  @Expose()
  isActive: boolean;

  @Expose()
  name: string;

  @Expose()
  description: string;
}

@Exclude()
export class SimpleProductCategoryDto extends PickType(ProductCategoryDto, [
  'id',
  'name',
  'description',
]) {
  constructor(user: PropertyOf<SimpleProductCategoryDto>) {
    super(user);
    Object.assign(this, user);
  }
}
