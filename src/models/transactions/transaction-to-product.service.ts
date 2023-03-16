import {
  TransactionToProduct,
  TransactionToProductDocument,
} from './entities/transactionToProduct.entity';
import { instanceToPlain } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Repository } from 'typeorm';
import { ICreateTransactionToProduct } from './types';
import { TransactionsService } from './transactions.service';
import { TransactionStatus } from '@/constants';

@Injectable()
export class TransactionToProductService extends BaseService<TransactionToProduct> {
  constructor(
    @InjectRepository(TransactionToProduct)
    private transactionToProductRepo: Repository<TransactionToProductDocument>,
    private transactionService: TransactionsService,
  ) {
    super(transactionToProductRepo);
  }

  /**
   * Create Transaction To Product Relation
   * @returns success: boolean, message: string
   **/
  async createTransactionToProduct({
    user,
    products,
    deliveryAddress,
  }: ICreateTransactionToProduct) {
    let totalPrice = 0;

    // calculate total price
    for (let i = 0; i < products.length; i++) {
      totalPrice += instanceToPlain(products[i]).product.price;
    }

    // insert into transaction table
    const newTransaction = await this.transactionService.create({
      user,
      status: TransactionStatus.PENDING,
      totalPrice,
      address: deliveryAddress,
    });

    // loop: insert into transaction to product relation table
    for (let i = 0; i < products.length; i++) {
      const data = this.transactionToProductRepo.create({
        transaction: newTransaction,
        product: instanceToPlain(products[i]).product,
        quantity: instanceToPlain(products[i]).quantity,
      });

      await this.transactionToProductRepo.save(data);
    }

    return {
      success: true,
      message: 'transaction added',
    };
  }
}
