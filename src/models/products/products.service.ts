import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService extends BaseService<ProductDocument> {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<ProductDocument>,
  ) {
    super(productRepo);
  }
}
