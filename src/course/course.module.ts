import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import Jwt from 'src/configs/jwt';

@Module({
  controllers: [CourseController],
  providers: [CourseService, Jwt],
})
export class CourseModule {}
