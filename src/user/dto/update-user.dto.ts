// import { PartialType } from '@nestjs/mapped-types';
// import { Login } from './create-user.dto';

// export class UpdateUserDto extends PartialType(Login) {}

export class UpdateUserInfo {
  account: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  userTypeCode: string;
  userTypeName: string;
  groupCode: string;
  birthday: string;
}
