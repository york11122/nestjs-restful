import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import * as uuid from 'uuid';
import * as moment from 'moment';
import { User } from '@/core/user/user.entity';
import { Cart } from '@/core/cart/cart.entity';

@Entity()
export class GroupBuy {
  @Expose()
  @ObjectIdColumn()
  _id: string;

  @Expose()
  @Column((type) => User)
  owner: User;

  @Expose()
  @Column((type) => Cart)
  carts: Cart[];

  @Expose()
  @Column()
  createdAt: Date;
  @Expose()
  @Column()
  updatedAt: Date;

  constructor(groupbuy: Partial<GroupBuy>) {
    if (groupbuy) {
      Object.assign(this, groupbuy);
      this._id = this._id || uuid.v1();
      this.owner = this.owner || undefined;
      this.carts = this.carts || [];
      this.createdAt = this.createdAt || new Date();
      this.updatedAt = new Date();
    }
  }
}
