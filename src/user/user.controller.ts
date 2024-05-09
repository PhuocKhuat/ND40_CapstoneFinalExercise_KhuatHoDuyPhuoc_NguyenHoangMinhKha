import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UseGuards,
  Headers,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AddUser, Login, Signup } from './dto/create-user.dto';
import { UpdateUserInfo } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import ApiResponses from 'src/configs/DescriptionStatus';

@ApiBearerAuth()
@ApiTags('UserManagement')
@Controller('/api/UserManagement')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // getUserList
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @Get('/GetUserList')
  getUserList(@Res() res: Response) {
    return this.userService.getUserList(res);
  }

  // getUserTypeList
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @Get('/GetUserTypeList')
  GetUserTypeList(@Res() res: Response) {
    return this.userService.GetUserTypeList(res);
  }

  // login
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @Post('/Login')
  login(@Res() res: Response, @Body() login: Login) {
    return this.userService.login(res, login);
  }

  // signup
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @Post('/Signup')
  signup(@Res() res: Response, @Body() signup: Signup) {
    return this.userService.signup(res, signup);
  }

  // refreshToken
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/RefreshToken')
  refreshToken(
    @Headers('Authorization') Authorization: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    return this.userService.refreshToken(req, res);
  }

  // getUserInfo
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @Post('/GetUserInformation')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  getUserInfo(@Req() req: any, @Res() res: Response) {
    return this.userService.getUserInfo(req, res);
  }

  // getUserPagedList
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @ApiQuery({ name: 'pageId', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get('/GetUserPagedList')
  getUserPagedList(
    @Res() res: Response,
    @Query('pageId') pageId: string = '1',
    @Query('pageSize') pageSize: string = '14',
  ) {
    return this.userService.getUserPagedList(res, pageId, pageSize);
  }

  // getSearchUsers
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @ApiQuery({ name: 'keyword', required: false })
  @Get('/SearchUsers')
  getSearchUsers(@Res() res: Response, @Query('keyword') keyword: string = '') {
    return this.userService.getSearchUsers(res, keyword);
  }

  // postAddUser
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @Post('/AddUser')
  @ApiBody({
    type: UpdateUserInfo,
    required: false,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  postAddUser(@Req() req: any, @Res() res: Response, @Body() addUser: AddUser) {
    return this.userService.postAddUsers(req, res, addUser);
  }

  // putUpdateUser
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @Put('/UpdateUserInfo')
  @ApiBody({
    type: UpdateUserInfo,
    required: false,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  udateUserInfo(
    @Req() req: any,
    @Res() res: Response,
    @Body() updateUserInfo: UpdateUserInfo,
  ) {
    return this.userService.updateUserInfo(req, res, updateUserInfo);
  }

  // deleteUser
  @ApiResponses.Success
  @ApiResponses.UnAuthorization
  @ApiResponses.Forbidden
  @ApiResponses.InternalServerError
  @Delete('/DeleteUser')
  @ApiQuery({
    name: 'Account',
    required: false,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  deleteUser(
    @Query('Account') account: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    return this.userService.deleteUser(account, req, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
