import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Product } from './product.entity';
import { UnprocessableError } from '@/common/errors/custom.error';
import { ERROR_CODE } from '@/common/constants/index';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async createProduct(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }
  public async findProduct(options?): Promise<Product[]> {
    return await this.productRepository.find(options);
  }
}
