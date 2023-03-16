import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import {
  Transaction,
  TransactionDocument,
} from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService extends BaseService<TransactionDocument> {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<TransactionDocument>,
  ) {
    super(transactionRepo);
  }
}
