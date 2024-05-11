import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AppService } from 'src/app.service';

@Injectable()
export class JwtStrategyRefresh extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService, private  appService: AppService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ADVANCED_SECRET_KEY'),
      passReqToCallback: true,
    });
  }
  async validate(request: Request, payload: any, res: Response) {
    return await this.appService.getUserIfRefreshTokenMatched(payload.userId, request.headers.authorization.split('Bearer ')[1], res);
  }
}
