export class AddCourse {
  aliases: string;
  courseName: string;
  description: string;
  views: string;
  groupCode: string;
  numberOfStudents: string;
  categoryId: string;
}

export class RegisterCourse {
  courseId: number;
  account: string;
}

export class EncrollCourse {
  courseId: number;
  account: string;
}

export class CancelCourse {
  courseId: number;
  account: string;
}
