import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<ProductDocument>,
  ) {
    super(productRepo);
  }

  /**
   * Get All Product
   * @returns ProductDocument[]
   **/
  async getAllProduct() {
    return await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'product_category')
      .getMany();
  }

  /**
   * Get a Product
   * @returns ProductDocument
   **/
  async getProductById(productId: number) {
    return await this.findOneByCondition({
      where: {
        id: productId,
      },
    });
  }
}
