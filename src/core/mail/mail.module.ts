import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@/core/user/user.entity'
import { Mail } from './mail.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Mail, User])],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService]
})
export class MailModule { }
