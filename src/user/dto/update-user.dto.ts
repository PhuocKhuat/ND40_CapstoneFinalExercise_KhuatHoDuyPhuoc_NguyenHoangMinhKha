import { PartialType } from '@nestjs/mapped-types';
import { Login } from './create-user.dto';

export class UpdateUserDto extends PartialType(Login) {}
