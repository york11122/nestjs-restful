import { Body, Controller, Post } from '@nestjs/common';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common'
import { SmsService } from './sms.service';
import { SMS } from './sms.entity'
import { sendSMSInput } from './sms.dto'

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async sendSMS (@Body() input: sendSMSInput): Promise<SMS> {
        const { phone_number } = input
        return await this.smsService.sendVerifySMS(phone_number)
    }

    // @Post('verify')
    // async verifySMS (@Body() input: verifySMSInput): Promise<SMS> {
    //     const { id, code } = input
    //     return await this.smsService.VerifySMS(id, code)
    // }
}
