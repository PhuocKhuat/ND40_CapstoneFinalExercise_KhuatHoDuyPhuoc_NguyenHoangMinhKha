// import { PartialType } from '@nestjs/swagger';

export class UpdateCourseDto {}

export class UpdateCourse {
  courseId: string;
  aliases: string;
  courseName: string;
  description: string;
  views: string;
  groupCode: string;
  numberOfStudents: string;
  categoryId: string;
}
