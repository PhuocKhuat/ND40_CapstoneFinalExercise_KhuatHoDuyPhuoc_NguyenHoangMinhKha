import { Injectable } from '@nestjs/common';
import responseData from './configs/response';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  prisma = new PrismaClient();

  // getUserIfRefreshTokenMatched
  async getUserIfRefreshTokenMatched(
    userId: string,
    refreshToken: string,
    res: Response,
  ) {
    const user = await this.prisma.users.findUnique({
      where: {
        user_id: parseInt(userId),
      },
    });

    if (!user) {
      responseData(res, 401, 'User not authorized', '');
      return;
    }

    if (refreshToken === user.refresh_token) {
      return user;
    }
  }
}
