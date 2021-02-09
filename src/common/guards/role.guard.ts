import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User, UserType } from '@core/user/user.entity'
import { UnauthorizedError } from '../errors/custom.error'
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate (
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<UserType[]>('role', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!roles) {
            return true;
        }
        const currentUser: User = context.switchToHttp().getRequest().currentUser
        if (roles.some((role) => currentUser.type === role)) {
            return true
        };

        throw new UnauthorizedError();


    }
}