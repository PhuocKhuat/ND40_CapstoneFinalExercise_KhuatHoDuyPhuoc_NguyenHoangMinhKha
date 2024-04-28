import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import Jwt from 'src/configs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, Jwt],
})
export class UserModule {}
