import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IPoolClient } from 'src/db/ConnectionInterface';
import { PostgresqlUnitOfWork } from 'src/db/PostgresqlUnitOfWork';

@Module({
  imports: [

  ],
  providers: [
    {

      provide: IPoolClient,
      useFactory: async (postgresqlUnitOfWork: PostgresqlUnitOfWork): Promise<IPoolClient> =>
      {
        return await postgresqlUnitOfWork.getConnection();
      },
      inject: [ PostgresqlUnitOfWork ]

    },

    AppService, PostgresqlUnitOfWork ],
  controllers: [ AppController ],

})
export class AppModule { }
