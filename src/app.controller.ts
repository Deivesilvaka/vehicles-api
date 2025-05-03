import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { name } from '../package.json';
import { STATUS_CODES } from 'http';

@ApiTags('Health-check')
@Controller()
export class AppController {
  @Get('/health')
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  healthCheck(): string {
    return `Service ${name} is up and running.`;
  }
}
