import { BaseEntity } from 'src/models/base/entities/base.entity';
import {
  Transaction,
  TransactionDocument,
} from 'src/models/transactions/entities/transaction.entity';
import { User, UserDocument } from 'src/models/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'address' })
export class Address extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  subDistrict: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  postalCode: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  country: string;

  @OneToOne(() => User, (user) => user.address)
  user: UserDocument;

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  @JoinColumn()
  transaction: TransactionDocument;
}

export type AddressDocument = Address & BaseEntity;
