import {
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@core/user/user.service';
import { verifyToken } from '@utils/auth/jwt'
import { ACCESS_TOKEN } from '@environment'
import { UnauthenticatedError } from '../errors/custom.error'

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {

    constructor(private readonly userService: UserService) {
        super()
    }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = req.headers[ACCESS_TOKEN] as string || '';
        let data = await verifyToken(token, 'accessToken')
        let currentUser = await this.userService.findUserByID(data._id)

        if (currentUser) {
            req.currentUser = currentUser;
            return true;
        }

        throw new UnauthenticatedError()
    }
}