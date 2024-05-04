import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function AuthBearer() {
  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: 'accesstoken',
      required: true,
    }),
  );
}