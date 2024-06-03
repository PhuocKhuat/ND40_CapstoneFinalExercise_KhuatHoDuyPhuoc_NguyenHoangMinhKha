import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInfo {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  account: string;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  userTypeCode: string;
  @ApiProperty()
  userTypeName: string;
  @ApiProperty()
  groupCode: string;
  @ApiProperty()
  birthday: string;
}
