import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@core/user/user.entity'
import { Mail } from './mail.entity';
import { UserService } from '@core/user/user.service'
@Module({
  imports: [TypeOrmModule.forFeature([User, Mail])],
  providers: [UserService, MailService],
  controllers: [MailController]
})
export class MailModule { }
