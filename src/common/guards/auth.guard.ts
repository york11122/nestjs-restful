import {
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@/core/user/user.entity';
import { verifyToken } from '@/utils/auth/jwt'
import { ACCESS_TOKEN } from '@/environment'
import { UnauthenticatedError } from '../errors/custom.error'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super()
    }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = req.headers[ACCESS_TOKEN] as string || '';
        const [err, data] = await verifyToken(token, 'accessToken')
        if (err) {
            throw new UnauthenticatedError()
        }
        let currentUser = await this.userRepository.findOne({ where: { _id: data._id } })

        if (currentUser) {
            req.currentUser = currentUser;
            return true;
        }

        throw new UnauthenticatedError()
    }
}