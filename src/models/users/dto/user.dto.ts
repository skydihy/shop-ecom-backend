import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '@/constants';
import { TransactionDocument } from '@/models/transactions/entities/transaction.entity';

export class UserDto {
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
