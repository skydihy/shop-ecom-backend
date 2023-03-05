import { instanceToPlain } from 'class-transformer';
import { AuthGuard } from '@/guards/auth.guard';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { TransactionToProductService } from './transaction-to-product.service';
import { ProductsService } from '../products/products.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionToProductService: TransactionToProductService,
    private productService: ProductsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/add')
  async createTransaction(@CurrentUser() user: User) {
    const mockProducts = [
      { product: await this.productService.getProductById(1), quantity: 2 },
      { product: await this.productService.getProductById(2), quantity: 1 },
    ];

    return await this.transactionToProductService.createTransactionToProduct({
      user: instanceToPlain(user)[0],
      products: mockProducts,
    });
  }
}
