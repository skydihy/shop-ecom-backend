import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionToProduct } from './entities/transactionToProduct.entity';
import { ProductsModule } from '../products/products.module';
import { TransactionToProductService } from './transaction-to-product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionToProduct]),
    ProductsModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionToProductService],
})
export class TransactionsModule {}
