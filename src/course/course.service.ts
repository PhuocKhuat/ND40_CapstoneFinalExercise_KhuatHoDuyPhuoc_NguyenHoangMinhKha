import { Injectable } from '@nestjs/common';
import {
  AddCourse,
  CancelCourse,
  EncrollCourse,
  RegisterCourse,
} from './dto/create-course.dto';
import { UpdateCourse } from './dto/update-course.dto';
import { PrismaClient } from '@prisma/client';
import responseData from 'src/configs/response';

@Injectable()
export class CourseService {
  prisma = new PrismaClient();

  //GET COURSE LIST
  async getCourseList(res: Response) {
    const courseList = await this.prisma.courses.findMany({
      include: { users: true, categories: true },
    });

    const format = courseList.map((course) => ({
      courseId: course.course_id,
      aliases: course.aliases,
      courseName: course.course_name,
      description: course.description,
      views: course.views,
      image: course.image,
      groupCode: course.group_code,
      createdDate: course.created_date,
      numberOfStudents: course.number_of_students,
      user: {
        userId: course.users.user_id,
        account: course.users.account,
        fullName: course.users.full_name,
        email: course.users.email,
        phone: course.users.phone,
        userTypeCode: course.users.user_type_code,
        userTypeName: course.users.user_type_name,
        groupCode: course.users.group_code,
        birthday: course.users.birthday,
      },
      category: {
        categoryId: course.categories.category_id,
        categoryName: course.categories.category_name,
      },
    }));

    responseData(res, 200, 'Proceed successfully', format);
  }

  //GET LIST CATALOG COURSE
  async getCatalogCourse(res: Response) {
    const catalogCourse = await this.prisma.categories.findMany();

    const format = catalogCourse.map((category) => ({
      categoryId: category.category_id,
      categoryName: category.category_name,
    }));

    responseData(res, 200, 'Proceed successfully', format);
  }

  //GET COURSE BY CATALOG
  async getCourseByCatalog(params: string, res: Response) {
    const catagory_id = params;

    const listCourse = await this.prisma.courses.findMany({
      where: {
        category_id: catagory_id,
      },
      include: { users: true },
    });

    responseData(res, 200, 'Proceed successfully', listCourse);
  }

  //GET COURSE BY ID COURSE
  async getCourseById(params: string, res: Response) {
    const course = parseInt(params, 10);
    const courseInfo = await this.prisma.courses.findUnique({
      where: {
        course_id: course,
      },
      include: { users: true },
    });
    responseData(res, 200, 'Proceed successfully', courseInfo);
  }

  //GET USER BY COURSE ID
  async getUserByCourseId(params: string, res: Response) {
    const course = parseInt(params, 10);

    const courseInfo = await this.prisma.courses.findMany({
      where: {
        course_id: course,
      },
      include: { users: true },
    });
    const userInfo = courseInfo.flatMap((course) => course.users);
    responseData(res, 200, 'Proceed successfully', userInfo);
  }

  //GET COURSE PAGE LIST
  async getCoursePageList(res: Response, pageId: string, pageSize: string) {
    const startingIndex = (parseInt(pageId) - 1) * parseInt(pageSize);

    const content = await this.prisma.courses.findMany({
      take: parseInt(pageSize),
      skip: startingIndex,
    });

    const numberOfUsers = await this.prisma.courses.count();

    responseData(res, 200, 'Proceed successfully', {
      content,
      allPageNumbers: Math.ceil(numberOfUsers / parseInt(pageSize)),
    });
  }

  // ADD COURSE
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

  // UPDATE COURSE
  async updateCourse(res: Response, updateCourse: UpdateCourse) {
    const {
      courseId,
      aliases,
      courseName,
      description,
      views,
      groupCode,
      numberOfStudents,
      categoryId,
    } = updateCourse;

    const checkCourse = await this.prisma.courses.findFirst({
      where: {
        course_name: courseName,
      },
    });

    if (!checkCourse) {
      return responseData(res, 404, 'Course does not exists', '');
    }

    const putCourse = await this.prisma.courses.update({
      where: {
        course_id: parseInt(courseId),
      },
      include: { categories: true },
      data: {
        aliases,
        course_name: courseName,
        description,
        views: parseInt(views),
        group_code: groupCode,
        created_date: new Date(),
        number_of_students: parseInt(numberOfStudents),
        category_id: categoryId,
      },
    });

    return responseData(res, 200, 'Update course successfully', putCourse);
  }

  // DELETE COURSE
  async deleteCourse(courseId: string, res: Response) {
    await this.prisma.courses.delete({
      where: {
        course_id: parseInt(courseId),
      },
    });

    responseData(res, 200, 'Delete course successfully', '');
  }

  // ENCROLL COURSE
  async enrollCourse(res: Response, encrollCourse: EncrollCourse) {
    const { courseId, account } = encrollCourse;

    const checkUser = await this.prisma.users.findFirst({
      where: {
        account,
      },
    });

    if (!checkUser) {
      return responseData(res, 404, 'Account not found', '');
    }

    const checkCourse = await this.prisma.course_enrollment.findFirst({
      where: {
        course_id: courseId,
        user_id: checkUser.user_id,
      },
    });

    if (!checkCourse) {
      return responseData(res, 404, 'Course not found', '');
    }

    const putCourse = await this.prisma.course_enrollment.update({
      where: {
        enrollment_id: checkCourse.enrollment_id,
      },
      data: {
        status: 2,
      },
      include: { users: true, courses: true },
    });
    return responseData(res, 200, 'Register course successfully', putCourse);
  }

  // SIGNUP COURSE
  async registerCourse(
    req: any,
    res: Response,
    registerCourse: RegisterCourse,
  ) {
    const { courseId, account } = registerCourse;

    const checkUser = await this.prisma.users.findFirst({
      where: {
        account,
      },
    });

    if (!checkUser) {
      return responseData(res, 404, 'Account not found', '');
    }

    const checkCourse = await this.prisma.course_enrollment.findFirst({
      where: {
        course_id: courseId,
        user_id: checkUser.user_id,
      },
    });

    if (checkCourse) {
      return responseData(res, 409, 'Course is registered', '');
    }

    const pushCourse = await this.prisma.course_enrollment.create({
      data: {
        created_date: new Date(),
        status: 1,
        user_id: checkUser.user_id,
        course_id: courseId,
      },
      include: { users: true, courses: true },
    });
    return responseData(res, 200, 'Register course successfully', pushCourse);
  }

  // CANCEL COURSE
  async cancelCourse(res: Response, cancelCourse: CancelCourse) {
    const { courseId, account } = cancelCourse;

    const checkUser = await this.prisma.users.findFirst({
      where: {
        account,
      },
    });

    const checkCourse = await this.prisma.course_enrollment.findFirst({
      where: {
        course_id: courseId,
        user_id: checkUser.user_id,
      },
    });

    await this.prisma.course_enrollment.delete({
      where: {
        enrollment_id: checkCourse.enrollment_id,
      },
    });

    return responseData(res, 200, 'Cancel course successfully', '');
  }
}
