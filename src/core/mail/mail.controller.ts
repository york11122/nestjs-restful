import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UseGuards, ClassSerializerInterceptor, UseInterceptors, UploadedFile } from '@nestjs/common'
import { JWTAuthGuard } from '@common'
import { MailService } from './mail.service';
import { Mail } from './mail.entity'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { User } from '@core/user/user.entity'
import { sendMailInput } from './mail.dto'
import { UnprocessableError } from '../../common/errors/custom.error'
import { ERROR_CODE } from '../../common/constants/index'

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @UseGuards(JWTAuthGuard)
    @Post('verify')
    async verifyEmail (@Body() input: sendMailInput, @CurrentUser() currentUser: User): Promise<Mail> {
        const { email } = input
        if (currentUser.isVerified) {
            throw new UnprocessableError({ message: 'Your email has been verified', code: ERROR_CODE.ALREADY_VERIFED })
        }
        return await this.mailService.sendVerifyEmail(email, currentUser)
    }

    @Get('track/:id')
    async trackMail (@Param('id') id: string): Promise<Mail> {
        return await this.mailService.setMailOpened(id)
    }
}
