import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/user.decorator'
import { UserService } from './user.service';
import { User } from './user.entity'
import { createUserInput } from './user.dto'
import { UseGuards, ClassSerializerInterceptor, UseInterceptors, UploadedFile } from '@nestjs/common'
import { JWTAuthGuard } from '@common'
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
    @Get('verify/:mailId')
    async verifyEmail (@Param('mailId') mailId: string): Promise<User> {
        return this.userService.verifyEmail(mailId)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createUser (@Body() param: createUserInput): Promise<User> {
        let { account, password, name } = param
        return await this.userService.createUser(account, password, name)
    }

    @UseGuards(JWTAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post('avatar')
    async uploadAvatar (@UploadedFile() file: any, @CurrentUser() currentUser: User): Promise<User> {
        return await this.userService.uploadAvatar(file, currentUser)
    }
}
