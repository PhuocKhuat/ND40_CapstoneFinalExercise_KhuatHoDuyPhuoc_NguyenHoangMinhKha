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
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { AddCourse } from './dto/create-course.dto';
import { UpdateCourse, UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('CourseManagement')
@Controller('/api/CourseManagement')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Get course list
  @Get('/GetCourseList')
  getCourseList(@Res() res: Response) {
    return this.courseService.getCourseList(res);
  }

  //Get catalog course
  @Get('/CourseCatalog')
  getCatalogCourse(@Res() res: Response) {
    return this.courseService.getCatalogCourse(res);
  }

  //Get course by catalog
  @Get('/CourseByCatalog/:catagory_id')
  getCourseByCatalog(
    @Res() res: Response,
    @Param('catagory_id') params: string,
  ) {
    return this.courseService.getCourseByCatalog(params, res);
  }

  //Get course by course_id
  @Get('/CourseById/:course_id')
  getCourseById(@Res() res: Response, @Param('course_id') params) {
    return this.courseService.getCourseById(params, res);
  }

  //Get info user by course id
  @Get('/GetUserByCourseId/:course_id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  getUserByCourseId(@Param('course_id') params, @Res() res: Response) {
    return this.courseService.getUserByCourseId(params, res);
  }

  //GetCoursePageList
  @ApiQuery({ name: 'pageId', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get('/GetUserPagedList')
  getUserPagedList(
    @Res() res: Response,
    @Query('pageId') pageId: string = '1',
    @Query('pageSize') pageSize: string = '14',
  ) {
    return this.courseService.getCoursePageList(res, pageId, pageSize);
  }

  // Add Course
  @Post('/AddCourse')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  addCourse(
    @Req() req: any,
    @Res() res: Response,
    @Body() addCourse: AddCourse,
  ) {
    return this.courseService.addCourse(req, res, addCourse);
  }

  // UPDATE COURSE
  @Put('/UpdateCourse')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  updateCourse(@Res() res: Response, @Body() updateCourse: UpdateCourse) {
    return this.courseService.updateCourse(res, updateCourse);
  }

  // DELETE COURSE
  @Delete('/DeleteCourse')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  deleteCourse(@Query('CourseId') courseId: string, @Res() res: Response) {
    return this.courseService.deleteCourse(courseId, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
