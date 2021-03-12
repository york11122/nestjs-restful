import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { SMS } from './sms.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SMS])],
  providers: [SmsService],
  controllers: [SmsController],
  exports: [SmsService]
})
export class SmsModule { }
