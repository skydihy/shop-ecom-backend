import { Serialize } from '@/interceptors/serialize.interceptor';
import { Controller, Get } from '@nestjs/common';
import { SimpleProduct } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Serialize(SimpleProduct)
  @Get()
  async getAllProduct() {
    return await this.productsService.findByCondition({
      relations: ['category'],
    });
  }
}
