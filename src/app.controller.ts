import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController
{
  public constructor (private readonly appService: AppService) { }

  @Get(":userId")
  public async getPostWithTags(@Param("userId", ParseIntPipe) userId: number): Promise<unknown[] | void>
  {
    return this.appService.getPostWithTags(userId);
  }
}
