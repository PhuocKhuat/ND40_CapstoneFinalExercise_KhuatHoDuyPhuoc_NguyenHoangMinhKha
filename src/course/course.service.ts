import { Injectable } from '@nestjs/common';
import { AddCourse } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaClient } from '@prisma/client';
import responseData from 'src/configs/response';

@Injectable()
export class CourseService {
  prisma = new PrismaClient();

  async addCourse(req: any, res: Response, addCourse: AddCourse) {
    const {
      aliases,
      courseName,
      description,
      views,
      groupCode,
      numberOfStudents,
      categoryId,
    } = addCourse;

    const { userId } = req.user;

    const checkCourse = await this.prisma.courses.findFirst({
      where: {
        course_name: courseName,
      },
    });

    if (checkCourse) {
      responseData(res, 409, 'Course name already exists', '');
      return;
    }

    const plusCourse = await this.prisma.courses.create({
      data: {
        aliases,
        course_name: courseName,
        description,
        views: parseInt(views),
        group_code: groupCode,
        created_date: new Date(),
        number_of_students: parseInt(numberOfStudents),
        user_id: userId,
        category_id: categoryId,
      },
    });

    const checkUser = await this.prisma.courses.findFirst({
      where: {
        course_name: plusCourse.course_name,
      },
      include: { users: true, categories: true },
    });

    const format = {
      aliases: plusCourse.aliases,
      courseName: plusCourse.course_name,
      description: plusCourse.description,
      views: plusCourse.views,
      groupCode: plusCourse.group_code,
      createdDate: plusCourse.created_date,
      numberOfStudents: plusCourse.number_of_students,
      user: {
        userId: plusCourse.user_id,
        account: checkUser.users.account,
        fullName: checkUser.users.full_name,
        email: checkUser.users.email,
        phone: checkUser.users.phone,
        password: checkUser.users.pass_word,
        userTypeCode: checkUser.users.user_type_code,
        userTypeName: checkUser.users.user_type_name,
        groupCode: checkUser.users.group_code,
        birthday: checkUser.users.birthday,
      },
      category: {
        categoryId: checkUser.categories.category_id,
        categoryName: checkUser.categories.category_name,
      },
    };

    responseData(res, 200, 'Add course successfully', format);
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
