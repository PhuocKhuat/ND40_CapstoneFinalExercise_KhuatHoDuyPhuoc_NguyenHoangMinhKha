import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Headers,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { HeadersToken, Login, Signup } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("UserManagement")
@Controller('/api/UserManagement')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // getUserList
  @UseGuards(AuthGuard('jwt'))
  @Get('/GetUserList')
  getUserList(@Res() res: Response) {
    return this.userService.getUserList(res);
  }

  // getUserTypeList
  @UseGuards(AuthGuard('jwt'))
  @Get('/GetUserTypeList')
  GetUserTypeList(@Res() res: Response) {
    return this.userService.GetUserTypeList(res);
  }

  // login
  @Post('/Login')
  login(@Res() res: Response, @Body() login: Login) {
    return this.userService.login(res, login);
  }

  // signup
  @Post('/Signup')
  signup(@Res() res: Response, @Body() signup: Signup) {
    return this.userService.signup(res, signup);
  }

  // refreshToken
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/RefreshToken')
  refreshToken(
    @Headers() headers: HeadersToken,
    @Req() req: any,
    @Res() res: Response,
  ) {
    return this.userService.refreshToken(headers, req, res);
  }

  // getUserInfo
  @UseGuards(AuthGuard('jwt'))
  @Post('/GetUserInformation')
  getUserInfo(@Req() req: any, @Res() res: Response) {
    return this.userService.getUserInfo(req, res);
  }

  // getUserPagedList
  @Get('/GetUserPagedList/:pageId')
  getUserPagedList(
    @Req() req: any,
    @Res() res: Response,
    @Query('pageId') pageId: string,
  ) {
    return this.userService.getUserPagedList(req, res);
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
