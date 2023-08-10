import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config';

import { CluesModule } from './modules/clues/clues.module';
import { Clue } from './modules/clues/entities/clue.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
    }),
    // setup typeorm
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mes',
      // entities: [Clue],
      autoLoadEntities: true, //Auto-load entities
      synchronize: true,
    }),
    CluesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
