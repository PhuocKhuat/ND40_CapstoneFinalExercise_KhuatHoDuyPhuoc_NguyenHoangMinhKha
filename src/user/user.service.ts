import { Injectable } from '@nestjs/common';
import { HeadersToken, Login, Signup } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import responseData from 'src/configs/response';
import * as bcrypt from 'bcrypt';
import Jwt from 'src/configs/jwt';

@Injectable()
export class UserService {
  constructor(private jwt: Jwt) {}

  prisma = new PrismaClient();

  // getUserList
  async getUserList(res: Response) {
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
    }));

    return responseData(res, 200, 'Proceed successfully', formatUserList);
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
      const token = await this.jwt.createToken({
        userId: checkAccount.user_id,
      });

      const tokenRef = await this.jwt.createTokenRef({
        userId: checkAccount.user_id,
      });

      await this.prisma.users.update({
        where: {
          user_id: checkAccount.user_id,
        },
        data: {
          refresh_token: tokenRef,
        },
      });

      const format = {
        account: checkAccount.account,
        password: password,
        token,
      };

      responseData(res, 200, 'Login successfully', format);
      return;
    }

    responseData(res, 404, 'Password is incorrect or does not exist', '');
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

  // refreshToken
  async refreshToken(headers: HeadersToken, req: any, res: Response) {
    const { authorization } = headers;
    // console.log('🚀 ~ UserService ~ refreshToken ~ token:', authorization);

    const { userId } = req.user;
    // console.log('🚀 ~ UserService ~ refreshToken ~ userId:', userId);

    // Bước nếu token lỗi và lỗi tên thì trả responseData trả lỗi, jwtStrategy đã làm rồi.

    const getUser = await this.prisma.users.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!getUser) {
      responseData(res, 401, 'User not found', '');
      return;
    }

    const verifyToken = req.user;
    console.log('🚀 ~ UserService ~ refreshToken ~ verifyToken:', verifyToken);

    const { key } = this.jwt.decodeTokenRef(getUser.refresh_token);

    if (verifyToken.key != key) {
      responseData(res, 401, 'Token is not authorized', '');
      return;
    }

    const newToken = this.jwt.createToken({
      userId: getUser.user_id,
    });

    responseData(res, 200, 'The token is refreshed', newToken);
  }

  // getUserInfo
  async getUserInfo(req: any, res: Response) {
    const { userId } = req.user;

    const getUserById = await this.prisma.users.findUnique({
      where: {
        user_id: userId,
      },
    });

    const format = {
      userId: getUserById.user_id,
      account: getUserById.account,
      fullName: getUserById.full_name,
      email: getUserById.email,
      phone: getUserById.phone,
      userTypeCode: getUserById.user_type_code,
      userTypeName: getUserById.user_type_name,
      groupCode: getUserById.group_code,
      avatar: getUserById.avatar,
    };

    responseData(res, 200, 'Proceed successfully', format);
  }

  // getUserPagedList
  async getUserPagedList(res: Response, pageId: string, pageSize: string) {
    const startingIndex = (parseInt(pageId) - 1) * parseInt(pageSize);

    const content = await this.prisma.users.findMany({
      take: parseInt(pageSize),
      skip: startingIndex,
    });

    const numberOfUsers = await this.prisma.users.count();

    const format = content.map((user) => ({
      userId: user.user_id,
      account: user.account,
      fullName: user.full_name,
      email: user.email,
      phone: user.phone,
      userTypeCode: user.user_type_code,
      userTypeName: user.user_type_name,
      groupCode: user.group_code,
      birthday: user.birthday,
      avatar: user.avatar,
    }));

    responseData(res, 200, 'Proceed successfully', {
      content: format,
      allPageNumbers: Math.ceil(numberOfUsers / parseInt(pageSize)),
    });
  }

  // getSearchUsers

  async getSearchUsers(res: Response, keyword: string) {
    const searchUsers = await this.prisma.users.findMany({
      where: {
        OR: [
          {
            account: {
              contains: keyword,
            },
          },
          {
            full_name: {
              contains: keyword,
            },
          },
          {
            email: {
              contains: keyword,
            },
          },
          {
            phone: {
              contains: keyword,
            },
          },
          {
            pass_word: {
              contains: keyword,
            },
          },
          {
            user_type_code: {
              contains: keyword,
            },
          },
          {
            user_type_name: {
              contains: keyword,
            },
          },
          {
            birthday: {
              contains: keyword,
            },
          },
        ],
      },
    });

    if (!searchUsers.length) {
      responseData(res, 404, 'Keyword not found', '');
      return;
    }

    const format = searchUsers.map((field) => ({
      account: field.account,
      fullName: field.full_name,
      email: field.email,
      phone: field.phone,
      password: field.pass_word,
      userTypeCode: field.user_type_code,
      userTypeName: field.user_type_name,
      birthday: field.birthday,
    }));

    responseData(res, 200, 'Proceed successfully', format);
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
