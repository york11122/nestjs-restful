import { Module } from '@nestjs/common';
import { GroupBuyService } from './groupbuy.service';
import { GroupBuyController } from './groupbuy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '@/core/cart/cart.entity';
import { GroupBuy } from '@/core/groupbuy/groupbuy.entity';
import { User } from '@/core/user/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, GroupBuy, Cart])],
  providers: [GroupBuyService],
  controllers: [GroupBuyController],
})
export class GroupBuyModule {}
