import { UserType } from '@core/user/user.entity';
import { SetMetadata } from '@nestjs/common';

export const Role = (...type: UserType[]) => SetMetadata('role', type);