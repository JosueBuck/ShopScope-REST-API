import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  getHello(@Res() res: any) {
    res.redirect(HttpStatus.MOVED_PERMANENTLY, `api-doc`);
  }
}
