import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import * as uuid from 'uuid';

@Entity()
export class Product {
  @Expose()
  @ObjectIdColumn()
  _id: string;

  @Expose()
  @Column()
  category: string;

  @Expose()
  @Column()
  title: string;

  @Expose()
  @Column()
  describe: string;

  @Expose()
  @Column()
  picture: string;

  @Expose()
  @Column()
  addOn: object;

  @Expose()
  @Column()
  @Exclude()
  createdAt: Date;

  @Expose()
  @Column()
  @Exclude()
  updatedAt: Date;

  constructor(product: Partial<Product>) {
    if (product) {
      Object.assign(this, product);
      this._id = this._id || uuid.v1();
      this.category = this.category || '';
      this.title = this.title || '';
      this.describe = this.describe || '';
      this.picture = this.picture || '';
      this.addOn = this.addOn || {};
      this.createdAt = this.createdAt || new Date();
      this.updatedAt = new Date();
    }
  }
}
