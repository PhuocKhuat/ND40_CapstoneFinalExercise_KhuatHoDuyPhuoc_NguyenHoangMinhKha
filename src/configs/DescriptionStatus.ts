import { ApiResponse } from '@nestjs/swagger';

export default class ApiResponses {
  static Success = ApiResponse({ status: 200, description: 'Success' });

  static UnAuthorization = ApiResponse({
    status: 401,
    description: 'Not authorized',
  });

  static Forbidden = ApiResponse({ status: 403, description: 'Forbidden' });

  static InternalServerError = ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  });

}
