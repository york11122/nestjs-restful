import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { JWTAuthGuard } from '@/common';
import { CurrentUser } from '../../../common/decorators/user.decorator';
import { User } from '@/core/user/user.entity';

import * as _ from 'lodash';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createOrder(@CurrentUser() currentUser: User): Promise<Order> {
    return await this.orderService.UpdateOrInsert(currentUser);
  }
}
