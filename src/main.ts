import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { migration } from './migrations/migrate';
async function bootstrap(): Promise<void>
{

  console.log("hi from docker");
  const app = await NestFactory.create(AppModule);



  await migration();
  await app.listen(4000);
}
bootstrap();
