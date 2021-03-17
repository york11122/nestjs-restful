import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, MongoRepository } from 'typeorm';
import { GroupBuy } from './groupbuy.entity';
import { Cart } from '@/core/cart/cart.entity';

import { UnprocessableError } from '@/common/errors/custom.error';
import { ERROR_CODE } from '@/common/constants/index';
import { User } from '../user/user.entity';

@Injectable()
export class GroupBuyService {
  constructor(
    @InjectRepository(GroupBuy)
    private readonly groupbuyRepository: MongoRepository<GroupBuy>,
    @InjectRepository(Cart)
    private readonly cartRepository: MongoRepository<Cart>,
  ) {}

  public async findByUser(user: User): Promise<GroupBuy> {
    const groupbuy = await this.groupbuyRepository.findOne({
      where: { 'owner._id': user._id },
    });
    if (!groupbuy) {
      throw new UnprocessableError({
        message: 'GroupBuy not existed.',
        code: ERROR_CODE.GROUPBUY_NOT_EXISTED,
      });
    }
    return groupbuy;
  }

  public async findOrCreate(user: User): Promise<GroupBuy> {
    const groupbuy = await this.groupbuyRepository.findOne({
      where: { 'owner._id': user._id },
    });
    if (!groupbuy) {
      const cart = await this.cartRepository.findOne({
        where: { 'owner._id': user._id },
      });

      if (!cart) {
        throw new UnprocessableError({
          message: 'Cart not existed.',
          code: ERROR_CODE.CART_NOT_EXISTED,
        });
      }
      let groupbuy = new GroupBuy({ owner: user });
      groupbuy.carts.push(cart);
      return await this.groupbuyRepository.save(groupbuy);
    }
    return groupbuy;
  }

  public async addOrUpdateCart(
    groupbuy_id: string,
    user: User,
  ): Promise<GroupBuy> {
    const groupbuy = await this.groupbuyRepository.findOne({
      _id: groupbuy_id,
    });

    if (!groupbuy) {
      throw new UnprocessableError({
        message: 'groupbuy not existed.',
        code: ERROR_CODE.GROUPBUY_NOT_EXISTED,
      });
    }
    const cart = await this.cartRepository.findOne({
      where: { 'owner._id': user._id },
    });

    const res = await this.groupbuyRepository.findOneAndUpdate(
      {
        _id: groupbuy_id,
        carts: { $elemMatch: { _id: cart._id } },
      },
      { $set: { 'carts.$': cart } },
      { returnOriginal: false, upsert: true },
    );
    return res.value;
  }
}
