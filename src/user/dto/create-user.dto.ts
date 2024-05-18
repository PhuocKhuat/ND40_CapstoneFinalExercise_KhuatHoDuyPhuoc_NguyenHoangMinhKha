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

export class GetListOfUnregisteredUsers {
  @ApiProperty()
  maKhoaHoc: string;
}

export class GetListOfStudentsPendingReview {
  @ApiProperty()
  maKhoaHoc: string;
}
