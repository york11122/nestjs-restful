import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from '@config/typeorm'
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { CacheService } from '@config/cache'
import { MailModule } from './core/mail/mail.module';
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
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
