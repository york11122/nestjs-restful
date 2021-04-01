import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from '@/config/typeorm';
import { UserModule } from '@/core/user/user.module';
import { AuthModule } from '@/core/auth/auth.module';
import { CacheService } from '@/config/cache';
import { MailModule } from '@/core/mail/mail.module';
import { SmsModule } from '@/core/sms/sms.module';
import { SocketModule } from '@/core/socket/socket.module';
import { CartModule } from '@/modules/shoppingCart/cart/cart.module';
import { ProductModule } from '@/modules/shoppingCart/product/product.module';
import { OrderModule } from '@/modules/shoppingCart/order/order.module';
import { GroupBuyModule } from '@/modules/shoppingCart/groupbuy/groupbuy.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    UserModule,
    AuthModule,
    MailModule,
    SmsModule,
    SocketModule,
    // CartModule,
    // ProductModule,
    // OrderModule,
    // GroupBuyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
