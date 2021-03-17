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
import { CartService } from './cart.service';
import { Cart } from './cart.entity';
import { JWTAuthGuard } from '@/common';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { User } from '@/core/user/user.entity';
import { addItemInput, removeItemInput, updateItemInput } from './cart.dto';

import * as _ from 'lodash';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  async myCart(@CurrentUser() currentUser: User): Promise<Cart> {
    return await this.cartService.findOrCreate(currentUser);
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findCart(@Param('id') cart_id: string): Promise<Cart> {
    return await this.cartService.findCartByID(cart_id);
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('item')
  async addItem(
    @Body() input: addItemInput,
    @CurrentUser() currentUser: User,
  ): Promise<Cart> {
    const { productId, cart_id, quantity, addOn } = input;
    return await this.cartService.addItem(
      productId,
      currentUser,
      addOn,
      quantity,
    );
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('item')
  async updateItem(
    @Body() input: updateItemInput,
    @CurrentUser() currentUser: User,
  ): Promise<Cart> {
    const { itemId, cart_id, quantity, addOn } = input;
    return await this.cartService.updateItem(
      itemId,
      addOn,
      quantity,
      currentUser,
    );
  }

  @UseGuards(JWTAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('item')
  async removeItem(
    @Body() input: removeItemInput,
    @CurrentUser() currentUser: User,
  ): Promise<Cart> {
    const { itemId, cart_id } = input;
    return await this.cartService.removeItem(itemId, currentUser);
  }
}
