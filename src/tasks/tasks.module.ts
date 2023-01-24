import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { AuthModule } from '../auth/auth.module';
import { TasksRepository } from '../tasks.repository';
import { Task } from './task.entity';
// import { TasksRepository } from '../tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
// import { ConfigModule } from '@nestjs/config';

//submodule - forFreature
//appmodule that is root module - forRoot
@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, Logger],
})
export class TasksModule {}
