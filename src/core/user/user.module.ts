import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Mail } from '@/core/mail/mail.entity';
import { SMS } from '@/core/sms/sms.entity';
import { MailService } from '@/core/mail/mail.service';
import { SmsService } from '@/core/sms/sms.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, SMS, Mail])],
  providers: [MailService, SmsService, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
