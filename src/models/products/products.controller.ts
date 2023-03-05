import { Serialize } from '@/interceptors/serialize.interceptor';
import { Controller, Get } from '@nestjs/common';
import { GetAllProductDto } from './dto/get-all-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Serialize(GetAllProductDto)
  @Get()
  async getAllProduct() {
    return await this.productsService.getAllProduct();
  }
}
