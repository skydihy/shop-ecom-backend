import { BaseDto } from '@/models/base/dto/base.dto';
import { Expose } from 'class-transformer';

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
