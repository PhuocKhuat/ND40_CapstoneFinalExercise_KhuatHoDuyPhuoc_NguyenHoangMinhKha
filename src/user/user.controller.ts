import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Res,
  UseGuards,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  AddUser,
  GetListOfPendingReviewStudents,
  GetListOfReviewedStudents,
  GetListOfUnregisteredUsers,
  Login,
  Signup,
} from './dto/create-user.dto';
import { UpdateUserInfo } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import ApiResponses from 'src/configs/DescriptionStatus';

@ApiResponses.Success
@ApiResponses.UnAuthorization
@ApiResponses.Forbidden
@ApiResponses.InternalServerError
// @ApiBearerAuth()
@ApiTags('UserManagement')
@Controller('/api/UserManagement')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // getUserList
  @Get('/GetUserList')
  getUserList(@Res() res: Response) {
    return this.userService.getUserList(res);
  }

  // getUserTypeList
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
  @Post('/RefreshToken')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshToken(@Req() req: any, @Res() res: Response) {
    return this.userService.refreshToken(req, res);
  }

  // getUserInfo
  @Post('/GetUserInformation')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  getUserInfo(@Req() req: any, @Res() res: Response) {
    return this.userService.getUserInfo(req, res);
  }

  // getUserPagedList
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
  @ApiQuery({ name: 'keyword', required: false })
  @Get('/SearchUsers')
  getSearchUsers(@Res() res: Response, @Query('keyword') keyword: string = '') {
    return this.userService.getSearchUsers(res, keyword);
  }

  // postAddUser
  @Post('/AddUser')
  @ApiBody({
    type: UpdateUserInfo,
    required: false,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  postAddUser(@Res() res: Response, @Body() addUser: AddUser) {
    return this.userService.postAddUsers(res, addUser);
  }

  // putUpdateUser
  @Put('/UpdateUserInfo')
  @ApiBody({
    type: UpdateUserInfo,
    required: false,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  udateUserInfo(
    @Res() res: Response,
    @Body() updateUserInfo: UpdateUserInfo,
  ) {
    return this.userService.updateUserInfo(res, updateUserInfo);
  }

  // deleteUser
  @Delete('/DeleteUser')
  @ApiQuery({
    name: 'Account',
    required: false,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  deleteUser(
    @Query('UserId') userId: string,
    @Res() res: Response,
  ) {
    return this.userService.deleteUser(userId, res);
  }

  // Get list of unregistered users
  @Post('/GetListOfUnregisteredUsers')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  getListOfUnregisteredUsers(
    @Req() req: any,
    @Res() res: Response,
    @Body() maKhoaHoc: GetListOfUnregisteredUsers,
  ) {
    return this.userService.getListOfUnregisteredUsers(req, res, maKhoaHoc);
  }

  // Get list of pending preview students
  @Post('/GetListOfPendingReviewStudents')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  getListOfPendingReviewStudents(
    @Req() req: any,
    @Res() res: Response,
    @Body() maKhoaHoc: GetListOfPendingReviewStudents,
  ) {
    return this.userService.getListOfPendingReviewStudents(req, res, maKhoaHoc);
  }

  // Get list of previewed students
  @Post('/GetListOfReviewedStudents')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  GetListOfReviewedStudents(
    @Res() res: Response,
    @Body() maKhoaHoc: GetListOfReviewedStudents,
  ) {
    return this.userService.GetListOfReviewedStudents(res, maKhoaHoc);
  }
}
