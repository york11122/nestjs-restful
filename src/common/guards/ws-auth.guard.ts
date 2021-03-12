import {
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@/core/user/user.entity';
import { verifyToken } from '@/utils/auth/jwt'
import { WsException } from '@nestjs/websockets'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
@Injectable()
export class WsAuthGuard extends AuthGuard('jwt') {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super()
    }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const client = context.switchToWs().getClient();
        const token = client.handshake.query.token || ""
        let [err, data] = await verifyToken(token, 'accessToken')
        // console.log(err)
        if (err) {
            throw new WsException('error')
        }
        let currentUser = await this.userRepository.findOne({ where: { _id: data._id } })

        if (currentUser) {
            return true;
        }
        throw new WsException('error')

    }
}