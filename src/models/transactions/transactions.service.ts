import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import {
  Transaction,
  TransactionDocument,
} from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionStatus } from '@/constants';
import { ICreateTransaction } from './types';

@Injectable()
export class TransactionsService extends BaseService<TransactionDocument> {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<TransactionDocument>,
  ) {
    super(transactionRepo);
  }

  /**
   * Create new Transaction
   * @returns Promise<Transaction>
   **/
  async createTransaction({ user, totalPrice, address }: ICreateTransaction) {
    const transactionData = {
      user,
      status: TransactionStatus.PENDING,
      totalPrice,
      address,
    };

    const newTransaction = this.create(transactionData);

    return await this.save(newTransaction);
  }
}
