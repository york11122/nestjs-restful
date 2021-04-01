import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './cart.entity';
import { Product } from '@/modules/shoppingCart/product/product.entity';
import { User } from '@/core/user/user.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Product])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
