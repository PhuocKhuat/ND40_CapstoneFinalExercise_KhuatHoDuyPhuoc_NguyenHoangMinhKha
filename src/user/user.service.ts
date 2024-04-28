import { Injectable } from '@nestjs/common';
import { Login, Signup } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import responseData from 'src/configs/response';
import * as bcrypt from 'bcrypt';
import Jwt from 'src/configs/jwt';

@Injectable()
export class UserService {
  constructor(private jwt: Jwt){}

  prisma = new PrismaClient();

  // getUserList
  async getUserList(res: Response) {
    try {
      const userList = await this.prisma.users.findMany();

      const formatUserList = userList.map((user) => ({
        account: user.account,
        fullName: user.full_name,
        email: user.email,
        phoneNumber: user.phone,
        password: user.pass_word,
        birthday: user.birthday,
        userTypeCode: user.user_type_code,
        userTypeName: user.user_type_name,
        avatar: user.avatar,
        refreshToken: user.refresh_token,
      }));

      return responseData(res, 200, 'Proceed successfully', formatUserList);
    } catch (error) {
      console.log('🚀 ~ UserService ~ getUserList ~ error:', error);
    }
  }

  // getUserTypeList
  async GetUserTypeList(res: Response) {
    const userTypeList = await this.prisma.user_type.findMany();

    const format = userTypeList.map((item) => ({
      userTypeCode: item.user_type_code,
      userTypeName: item.user_type_name,
    }));

    responseData(res, 200, 'Proceed successfully', format);
  }

  // login
  async login(res: Response, login: Login) {
    try {
      const { account, password } = login;

      const checkAccount = await this.prisma.users.findFirst({
        where: {
          account,
        },
      });

      if (!checkAccount) {
        responseData(res, 404, 'Account is incorrect or does not exist', '');
        return;
      }

      if (bcrypt.compareSync(password, checkAccount.pass_word)) {
        const token = await this.jwt.createToken({userId: checkAccount.user_id});

        const format = {
          account: checkAccount.account,
          password: password,
          token,
        };

        responseData(res, 200, 'Login successfully', format);
        return;
      }

      responseData(res, 404, 'Password is incorrect or does not exist', '');
    } catch (error) {
      console.log('🚀 ~ UserService ~ login ~ error:', error);
    }
  }

  // signup
  async signup(res: Response, signup: Signup) {
    const { account, fullName, password, email, birthday, phone } = signup;

    const checkAccount = await this.prisma.users.findFirst({
      where: {
        account,
      },
    });

    if (checkAccount) {
      responseData(res, 400, 'Account already exists', '');
      return;
    }

    const newAccount = await this.prisma.users.create({
      data: {
        account,
        full_name: fullName,
        pass_word: bcrypt.hashSync(password, 10),
        email,
        birthday,
        phone,
        user_type_code: 'HV',
        user_type_name: 'Học viên',
        group_code: 'GP01',
      },
    });

    const format = {
      userId: newAccount.user_id,
      account: newAccount.account,
      fullName: newAccount.full_name,
      password: newAccount.pass_word,
      email: newAccount.email,
      birthday: newAccount.birthday,
      phone: newAccount.phone,
      groupCode: newAccount.group_code,
    };

    responseData(res, 200, 'Signup successfully', format);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
