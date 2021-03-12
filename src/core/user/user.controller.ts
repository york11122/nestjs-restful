import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/user.decorator'
import { UserService } from './user.service';
import { User } from './user.entity'
import { createUserInput, verifyPhoneInput } from './user.dto'
import { UseGuards, ClassSerializerInterceptor, UseInterceptors, UploadedFile } from '@nestjs/common'
import { JWTAuthGuard } from '@/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JWTAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async me (@CurrentUser() currentUser: User): Promise<User> {
        return currentUser
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('verify/mail')
    async verifyEmail (@Body('mailId') mailId: string): Promise<User> {
        return this.userService.verifyEmail(mailId)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JWTAuthGuard)
    @Post('verify/phone')
    async verifyPhone (@Body() param: verifyPhoneInput, @CurrentUser() currentUser: User): Promise<User> {
        const { smsId, code } = param
        return this.userService.verifySMS(smsId, code, currentUser)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createUser (@Body() param: createUserInput): Promise<User> {
        const { account, password, name } = param
        return await this.userService.createUser(account, password, name)
    }

    @UseGuards(JWTAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post('avatar')
    async uploadAvatar (@UploadedFile() file: any, @CurrentUser() currentUser: User): Promise<User> {
        return await this.userService.uploadAvatar(file, currentUser)
    }
}
