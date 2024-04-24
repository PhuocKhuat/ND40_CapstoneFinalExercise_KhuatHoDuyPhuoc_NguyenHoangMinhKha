import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import responseData from 'src/configs/response';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(res: Response) {
    const userList = await prisma.users.findMany();

    const formatUserList = userList.map((user) => ({
      taiKhoan: user.account,
      hoTen: user.full_name,
      email: user.email,
      soDT: user.phone,
      matKhau: user.pass_word,
      ngaySinh: user.birthday,
      maLoaiNguoiDung: user.user_type_code,
      tenLoaiNguoiDung: user.user_type_name,
      avatar: user.avatar,
    }))
    return responseData(res, 200, "Proceed successfully", formatUserList);
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
