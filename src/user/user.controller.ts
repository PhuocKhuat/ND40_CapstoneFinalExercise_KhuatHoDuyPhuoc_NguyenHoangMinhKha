import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Login, Signup } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/UserManagement')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/GetUserList")
  getUserList(@Res() res: Response) {
    return this.userService.getUserList(res);
  }

  @Get("/GetUserTypeList")
  GetUserTypeList(@Res() res: Response) {
    return this.userService.GetUserTypeList(res);
  }

  @Post("/Login")
  login(@Res() res: Response, @Body() login: Login) {
    return this.userService.login(res, login);
  }

  @Post("/Signup")
  signup(@Res() res: Response, @Body() signup: Signup) {
    return this.userService.signup(res, signup);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
