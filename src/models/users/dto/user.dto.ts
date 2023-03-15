import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '@/constants';
import { TransactionDocument } from '@/models/transactions/entities/transaction.entity';
import { BaseDto } from '@/models/base/dto/base.dto';
import { OmitType } from '@nestjs/swagger';
import { PropertyOf } from '@/types';

export class UserDto extends BaseDto {
  @Expose()
  lastLogin: Date;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  phoneNumber: string;

  @Expose()
  balance: number;

  @Expose()
  transaction: TransactionDocument[];
}

@Exclude()
export class SimpleUserDto extends OmitType(UserDto, [
  'isActive',
  'updatedAt',
  'password',
  'createdAt',
]) {
  constructor(user: PropertyOf<SimpleUserDto>) {
    super(user);
    Object.assign(this, user);
  }
}
