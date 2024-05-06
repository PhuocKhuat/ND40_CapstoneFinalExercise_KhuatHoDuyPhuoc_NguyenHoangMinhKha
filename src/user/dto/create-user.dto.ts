import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty()
  account: string;
  @ApiProperty()
  password: string;
}

export class Signup {
  @ApiProperty()
  account: string;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  birthday: string;
  @ApiProperty()
  phone: string;
}

export class AddUser {
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
