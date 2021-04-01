import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { User } from '@/core/user/user.entity';
import { Product } from '@/modules/shoppingCart/product/product.entity';
import * as uuid from 'uuid';

export class CartItem {
  _id: string;
  item: Partial<Product>;
  addOn: object;
  quantity: number;
}

@Entity()
export class Cart {
  @Expose()
  @ObjectIdColumn()
  _id: string;

  @Expose()
  @Column((type) => User)
  owner: User;

  @Expose()
  @Column()
  itemList: CartItem[];

  @Expose()
  @Column()
  createdAt: Date;

  @Expose()
  @Column()
  updatedAt: Date;

  constructor(cart: Partial<Cart>) {
    if (cart) {
      Object.assign(this, cart);
      this._id = this._id || uuid.v1();
      this.owner = this.owner || undefined;
      this.itemList = this.itemList || [];
      this.createdAt = this.createdAt || new Date();
      this.updatedAt = new Date();
    }
  }
}
