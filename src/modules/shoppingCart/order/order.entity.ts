import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { User } from '@/core/user/user.entity';
import { Product } from '@/modules/shoppingCart/product/product.entity';
import * as uuid from 'uuid';

export class CartItem {
  _id: string;
  createor: Partial<User>;
  item: Partial<Product>;
  addOn: object;
  quantity: number;
}

export enum OrderStatus {
  Normal,
  Paid,
  Finish,
}

@Entity()
export class Order {
  @Expose()
  @ObjectIdColumn()
  _id: string;

  @Expose()
  @Column()
  userId: string;

  @Expose()
  @Column()
  price: number;

  @Expose()
  @Column()
  isGroupBuy: boolean;

  @Expose()
  @Column()
  status: OrderStatus;

  @Expose()
  @Column()
  itemList: CartItem[];

  @Expose()
  @Column()
  createdAt: Date;

  @Expose()
  @Column()
  updatedAt: Date;

  constructor(order: Partial<Order>) {
    if (order) {
      Object.assign(this, order);
      this._id = this._id || uuid.v1();
      this.userId = this.userId || '';
      this.isGroupBuy = this.isGroupBuy || false;
      this.price = this.price || 0;
      this.itemList = this.itemList || [];
      this.status = this.status || OrderStatus.Normal;
      this.createdAt = this.createdAt || new Date();
      this.updatedAt = new Date();
    }
  }
}
