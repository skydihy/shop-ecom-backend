import { Expose } from 'class-transformer';

export abstract class BaseDto {
  @Expose()
  id: number;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
