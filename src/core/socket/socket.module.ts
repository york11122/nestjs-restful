import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { SocketGateway } from './socket.gateway'
import { User } from '@/core/user/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SocketController],
  providers: [SocketGateway]
})
export class SocketModule { }
