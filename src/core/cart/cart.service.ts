import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ObjectID,
  Repository,
  getMongoManager,
  MongoRepository,
} from 'typeorm';
import { Cart, CartItem } from './cart.entity';
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
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: MongoRepository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: MongoRepository<Product>,
  ) {}

  public async createCart(user: User): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { ownerId: user._id },
    });
    if (!cart) {
      return await this.cartRepository.save(new Cart({ ownerId: user._id }));
    }
    return cart;
  }

  public async findCartByID(cart_id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { _id: cart_id } });
    if (!cart) {
      throw new UnprocessableError({
        message: 'Cart not existed.',
        code: ERROR_CODE.CART_NOT_EXISTED,
      });
    }
    return cart;
  }

  public async addItem(
    productId: string,
    cart_id: string,
    user: User,
    addOn: object,
    quantity: number,
  ): Promise<Cart> {
    //取得商品資訊
    const product = await this.productRepository.findOne({
      where: { _id: productId },
    });

    //商品不存在
    if (!product) {
      throw new UnprocessableError({
        message: 'Product not existed.',
        code: ERROR_CODE.PRODUCT_NOT_EXISTED,
      });
    }

    //取得購物車
    let cart = await this.cartRepository.findOne({
      where: { _id: cart_id },
    });

    //查無購物車
    if (!cart) {
      throw new UnprocessableError({
        message: 'Cart not existed.',
        code: ERROR_CODE.CART_NOT_EXISTED,
      });
    }
    //非團購狀態亦非購物車擁有者
    if (!cart.isGroupBuy && cart.ownerId !== user._id) {
      throw new UnauthorizedError();
    }
    //加入購物車商品清單
    const res = await this.cartRepository.findOneAndUpdate(
      { _id: cart_id },
      {
        $push: {
          itemList: {
            _id: uuid.v1(),
            createor: plainToClass(User, user, {
              excludeExtraneousValues: true,
            }),
            item: plainToClass(Product, product, {
              excludeExtraneousValues: true,
            }),
            addOn,
            quantity,
          },
        },
      },
      { returnOriginal: false },
    );

    return res.value;
  }

  public async removeItem(
    ItemId: string,
    cart_id: string,
    user: User,
  ): Promise<Cart> {
    //取得購物車

    let cart = await this.cartRepository.findOne({
      where: { _id: cart_id },
    });

    //查無購物車
    if (!cart) {
      throw new UnprocessableError({
        message: 'Cart not existed.',
        code: ERROR_CODE.CART_NOT_EXISTED,
      });
    }
    //非團購狀態亦非購物車擁有者
    if (!cart.isGroupBuy && cart.ownerId !== user._id) {
      throw new UnauthorizedError();
    }

    let item: CartItem = _.find(cart.itemList, { _id: ItemId });
    console.log(item);
    if (!item) {
      throw new UnprocessableError({
        message: 'item not existed.',
        code: ERROR_CODE.CART_NOT_EXISTED,
      });
    }

    if (item.createor._id !== user._id) {
      console.log(item.createor._id, user._id);
      throw new UnauthorizedError();
    }

    //移除購物車商品清單
    const res = await this.cartRepository.findOneAndUpdate(
      {
        _id: cart_id,
      },
      { $pull: { itemList: { _id: ItemId } } },
      { returnOriginal: false },
    );
    return res.value;
  }

  public async updateItem(
    ItemId: string,
    cart_id: string,
    addOn: object,
    quantity: number,
    user: User,
  ): Promise<Cart> {
    //取得購物車
    let cart = await this.cartRepository.findOne({
      where: { _id: cart_id },
    });

    //查無購物車
    if (!cart) {
      throw new UnprocessableError({
        message: 'Cart not existed.',
        code: ERROR_CODE.CART_NOT_EXISTED,
      });
    }
    //非團購狀態亦非購物車擁有者
    if (!cart.isGroupBuy && cart.ownerId !== user._id) {
      throw new UnauthorizedError();
    }
    //修改商品
    const res = await this.cartRepository.findOneAndUpdate(
      {
        _id: cart_id,
        itemList: { $elemMatch: { _id: ItemId } },
      },
      { $set: { 'itemList.$.quantity': quantity } },
      { returnOriginal: false },
    );
    return res.value;
  }
}
