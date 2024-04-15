import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController
{
  public constructor (private readonly appService: AppService) { }

  @Get("firstApproach/:userId")
  public async getPostWithTags(@Param("userId", ParseIntPipe) userId: number): Promise<unknown[] | void>
  {
    return this.appService.getPostWithTags(userId);
  }


  @Get("secondApproach/:userId")
  public async getPostWithTags2(@Param("userId", ParseIntPipe) userId: number): Promise<unknown[] | void>
  {


    return this.appService.getPostWithTags2(userId);
  }
}
