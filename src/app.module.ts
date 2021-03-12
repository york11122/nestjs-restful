import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from '@/config/typeorm'
import { UserModule } from '@/core/user/user.module';
import { AuthModule } from '@/core/auth/auth.module';
import { CacheService } from '@/config/cache'
import { MailModule } from '@/core/mail/mail.module';
import { SmsModule } from '@/core/sms/sms.module';
import { SocketModule } from '@/core/socket/socket.module';
import { CartModule } from './core/cart/cart.module';
import { ProductModule } from './core/product/product.module';
import { OrderModule } from './core/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService
    }),
    CacheModule.registerAsync({
      useClass: CacheService
    }),
    UserModule,
    AuthModule,
    MailModule,
    SmsModule,
    SocketModule,
    CartModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
