import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionToProduct } from './entities/transactionToProduct.entity';
import { ProductsModule } from '../products/products.module';
import { TransactionToProductService } from './transaction-to-product.service';
import { UsersModule } from '../users/users.module';
import { AddressesModule } from '../addresses/addresses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionToProduct]),
    ProductsModule,
    UsersModule,
    AddressesModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionToProductService],
})
export class TransactionsModule {}
