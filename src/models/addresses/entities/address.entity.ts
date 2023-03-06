import { BaseEntity } from 'src/models/base/entities/base.entity';
import {
  Transaction,
  TransactionDocument,
} from 'src/models/transactions/entities/transaction.entity';
import { User, UserDocument } from 'src/models/users/entities/user.entity';
import { Column, Entity, OneToOne, ManyToOne } from 'typeorm';

@Entity({ name: 'address' })
export class Address extends BaseEntity {
  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  subDistrict: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 300 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  postalCode: string;

  @Column({ type: 'varchar', length: 300 })
  country: string;

  @ManyToOne(() => User, (user) => user.id)
  user: UserDocument;

  @OneToOne(() => Transaction, (transaction) => transaction.id)
  transaction: TransactionDocument;
}

export type AddressDocument = Address & BaseEntity;
