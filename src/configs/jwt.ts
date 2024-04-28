import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

class data {
  userId: number;
}

@Injectable()
export default class Jwt {
  constructor(private jwtService: JwtService) {}
  createToken(data: data) {
    return this.jwtService.signAsync(data, {
      secret: 'SECRET_KEY',
      expiresIn: '5d',
    });
  }
}
