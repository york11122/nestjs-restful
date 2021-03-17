import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ObjectID,
  Repository,
  getMongoManager,
  MongoRepository,
} from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { Cart, CartItem } from '@/core/cart/cart.entity';
import {
  UnprocessableError,
  UnauthorizedError,
} from '@/common/errors/custom.error';
import { ERROR_CODE } from '@/common/constants/index';
import { Product } from '../product/product.entity';
import { User } from '@/core/user/user.entity';
import * as uuid from 'uuid';
import { Expose, plainToClass } from 'class-transformer';
import * as _ from 'lodash';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: MongoRepository<Order>,
    @InjectRepository(Cart)
    private readonly cartRepository: MongoRepository<Cart>,
  ) {}

  public async UpdateOrInsert(user: User): Promise<Order> {
    const cart = await this.cartRepository.findOne({
      where: { ownerId: user._id },
    });
    if (!cart) {
      throw new UnprocessableError({
        message: 'Cart not existed.',
        code: ERROR_CODE.CART_NOT_EXISTED,
      });
    }

    const order = await this.orderRepository.findOne({
      where: { userId: user._id, status: OrderStatus.Normal },
    });
    console.log(order);
    return await this.orderRepository.save(
      new Order({
        ...order,
        userId: user._id,
      }),
    );
  }
}
