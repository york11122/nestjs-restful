import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { createProductInput } from './product.dto';
import * as _ from 'lodash';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('all')
  async allProducts(): Promise<object> {
    return _.chain(await this.productService.findProduct())
      .groupBy('category')
      .map((value, key) => ({ category: key, itemList: value }))
      .value();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findProduct(@Param('id') id: string): Promise<object> {
    return await this.productService.findProduct({ _id: id });
  }

  @Post()
  async createProduct(@Body() input: createProductInput): Promise<Product> {
    return await this.productService.createProduct(new Product({ ...input }));
  }
}
