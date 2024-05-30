import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { AddCourse } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('CourseManagement')
@Controller('/api/CourseManagement')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Add Course
  @Post("/AddCourse")
  @UseGuards(AuthGuard('jwt'))
  addCourse(@Req() req: any, @Res() res: Response, @Body() addCourse: AddCourse) {
    return this.courseService.addCourse(req, res, addCourse);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
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
