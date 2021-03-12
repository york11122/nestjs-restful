import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose, plainToClass, Exclude } from 'class-transformer';
import * as uuid from 'uuid';
export class Local {
  account: string;
  password: string;
}

export class Line {
  _id: string;
  token?: string;
  name?: string;
}

export class Facebook {
  _id: string;
  token?: string;
  name?: string;
  email?: string;
}

export class Google {
  _id: string;
  token?: string;
  name?: string;
  email?: string;
}

export enum UserType {
  BASIC,
  ADMIN,
}

@Entity()
export class User {
  @Expose()
  @ObjectIdColumn()
  _id: string;

  @Expose()
  @Column()
  @Exclude()
  local: Local;

  @Expose()
  @Column()
  @Exclude()
  line: Line;

  @Expose()
  @Column()
  @Exclude()
  facebook: Facebook;

  @Expose()
  @Column()
  @Exclude()
  google: Google;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column()
  avatar: string;

  @Expose()
  @Column()
  email: string;

  @Expose()
  @Column()
  phone_number: string;

  @Expose()
  @Column()
  isVerified: boolean;

  @Expose()
  @Column()
  type: UserType;

  @Expose()
  @Column()
  @Exclude()
  createdAt: Date;

  @Expose()
  @Column()
  @Exclude()
  updatedAt: Date;

  constructor(user: Partial<User>) {
    if (user) {
      Object.assign(this, user);

      this._id = this._id || uuid.v1();
      this.name = this.name || '';
      this.type = this.type || UserType.BASIC;
      this.isVerified = this.isVerified || false;
      this.phone_number = this.phone_number || '';
      this.createdAt = this.createdAt || new Date();
      this.updatedAt = new Date();
    }
  }
}
