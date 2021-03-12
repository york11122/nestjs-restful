import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SocketGateway } from './socket.gateway'
import { JWTAuthGuard } from '@/common'
import { CurrentUser } from '@/common/decorators/user.decorator';
import { User } from '@/core/user/user.entity'
@Controller('socket')
export class SocketController {
    constructor(private readonly socket: SocketGateway) { }

    @UseGuards(JWTAuthGuard)
    @Get('push/:message')
    send (@Param('message') msg: string, @CurrentUser() currentUser: User): any {
        this.socket.sendToAll(msg, currentUser._id)
        return 'success'
    }
}
