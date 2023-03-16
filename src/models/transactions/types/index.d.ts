import { AddressDocument } from '@/models/addresses/entities/address.entity';
import { ProductDocument } from '@/models/products/entities/product.entity';
import { UserDocument } from '@/models/users/entities/user.entity';

export interface IAddTransactionToProduct {
  transactionId: number;
  productId: number;
  quantity: number;
}

export interface ICreateTransaction {
  user: UserDocument;
  totalPrice: number;
  address: AddressDocument;
}

export interface ICreateTransactionToProduct {
  user: UserDocument;
  products: {
    product: ProductDocument;
    quantity: number;
  }[];
  deliveryAddress: AddressDocument;
}
