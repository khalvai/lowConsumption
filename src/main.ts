import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { migration } from './db/migrate';
async function bootstrap(): Promise<void>
{

  const app = await NestFactory.create(AppModule);




  await migration();
  await app.listen(4000);
}
bootstrap();
