import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtStrategyRefresh } from './strategy/jwt.strategy.refresh';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({ global: true, secret: "" }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtStrategyRefresh],
})
export class AppModule {}
