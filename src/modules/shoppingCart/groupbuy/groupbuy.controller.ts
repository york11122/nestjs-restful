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
import { GroupBuyService } from './groupbuy.service';
import { GroupBuy } from './groupbuy.entity';
import { JWTAuthGuard } from '@/common';
import { CurrentUser } from '../../../common/decorators/user.decorator';
import { User } from '@/core/user/user.entity';

import * as _ from 'lodash';

@Controller('groupbuy')
export class GroupBuyController {
  constructor(private readonly groupbuyService: GroupBuyService) {}

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  async myGroupBuy(@CurrentUser() currentUser: User): Promise<GroupBuy> {
    return await this.groupbuyService.findByUser(currentUser);
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createGroupBuy(@CurrentUser() currentUser: User): Promise<GroupBuy> {
    return await this.groupbuyService.findOrCreate(currentUser);
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('cart')
  async addOrUpdateCart(
    @Body('groupbuy_id') groupbuy_id: string,
    @CurrentUser() currentUser: User,
  ): Promise<GroupBuy> {
    return await this.groupbuyService.addOrUpdateCart(groupbuy_id, currentUser);
  }
}
