/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Job } from './jobs.entity';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'jobmanagement_user',
      password: 'zgfVwgPPHaBOowQKOZn7na6yDcaDVX9K',
      database: 'jobmanagement',
      entities: [Job],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Job]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
