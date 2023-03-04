import { UserRole } from 'src/constants';
import {
  Address,
  AddressDocument,
} from 'src/models/addresses/entities/address.entity';
import { BaseEntity } from 'src/models/base/entities/base.entity';
import {
  Transaction,
  TransactionDocument,
} from 'src/models/transactions/entities/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 300,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @Column({ type: 'float8', default: 0 })
  balance: number;

  @OneToMany(() => Address, (address) => address.id)
  address: AddressDocument[];

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  transaction: TransactionDocument[];
}

export type UserDocument = User & BaseEntity;
