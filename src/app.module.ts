import './environments';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './models/users/users.module';
import { User } from './models/users/entities/user.entity';
import { ProductsModule } from './models/products/products.module';
import { CartsModule } from './models/carts/carts.module';
import { TransactionsModule } from './models/transactions/transactions.module';
import { AddressesModule } from './models/addresses/addresses.module';
import { Address } from './models/addresses/entities/address.entity';
import { Product } from './models/products/entities/product.entity';
import { Cart } from './models/carts/entities/cart.entity';
import { Transaction } from './models/transactions/entities/transaction.entity';
import { ProductCategory } from './models/products/entities/product-category.entity';
import { CartItem } from './models/carts/entities/cartItem.entity';
import cookieSession from 'cookie-session';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      autoLoadEntities: true,
      synchronize: false,
      logging: false,
      entities: [
        User,
        Address,
        Cart,
        CartItem,
        Transaction,
        Product,
        ProductCategory,
      ],
    }),
    UsersModule,
    CartsModule,
    TransactionsModule,
    AddressesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['shop_ecom_session_key'],
        }),
      )
      .forRoutes('*');
  }
}
