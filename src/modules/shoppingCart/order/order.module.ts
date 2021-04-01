import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '@/modules/shoppingCart/cart/cart.entity';
import { Order } from './order.entity';
import { User } from '@/core/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Order])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
