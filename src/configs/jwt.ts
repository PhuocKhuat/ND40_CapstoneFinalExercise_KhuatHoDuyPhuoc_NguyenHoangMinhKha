import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

class data {
  userId: number;
}

@Injectable()
export default class Jwt {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createToken(data: data) {
    return this.jwtService.signAsync(data, {
      secret: `${this.configService.get("SECRET_KEY")}`,
      expiresIn: `${this.configService.get('JWT_TOKEN_EXPIRATION_TIME')}`,
    });
  }

  createTokenRef(data: data) {
    return this.jwtService.signAsync(data, {
      secret: `${this.configService.get("ADVANCED_SECRET_KEY")}`,
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`,
    });
  }
}
