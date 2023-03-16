import { AuthGuard } from '@/guards/auth.guard';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { TransactionToProductService } from './transaction-to-product.service';
import { ProductsService } from '../products/products.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AddressesService } from '../addresses/addresses.service';
import { UsersService } from '../users/users.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionToProductService: TransactionToProductService,
    private productService: ProductsService,
    private userService: UsersService,
    private addressService: AddressesService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/add')
  async addTransaction(
    @CurrentUser() user: User,
    @Body() body: CreateTransactionDto[],
  ) {
    const deliveryId = await this.userService
      .findOneByCondition({
        where: {
          id: user[0].id,
        },
      })
      .then((res) => res.deliveryAddressId);

    if (!deliveryId) {
      throw new NotFoundException('Delivery Address Not Found');
    }

    const deliveryAddress = await this.addressService.findOneByCondition({
      where: { id: deliveryId },
    });

    const payloadProducts = await Promise.all(
      body.map(async (e) => ({
        product: await this.productService.findOneByCondition({
          where: {
            id: e.productId,
          },
        }),
        quantity: e.quantity,
      })),
    );

    return await this.transactionToProductService.createTransactionToProduct({
      user: user[0],
      products: payloadProducts,
      deliveryAddress: deliveryAddress,
    });
  }
}
