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


  @Get("optimize/:userId")
  public async getPostWithTags2(@Param("userId", ParseIntPipe) userId: number): Promise<unknown[] | void>
  {

    console.log("jere");

    return this.appService.getPostWithTags2(userId);
  }
}
