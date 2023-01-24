// import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './tasks/dto/get-tasks-filter.dto';
import { Task } from './tasks/task.entity';
// import { TaskStatus } from './tasks/task.status.enum';
// import { CreateTaskDto } from './tasks/dto/create-task.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  // private logger = new Logger('TasksRepository', { timestamp: true });
  // async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
  //   const query = this.createQueryBuilder('task');
  //   const tasks = await query.getMany();
  //   return tasks;
  // }
  
  // async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
  //   const { title, description } = createTaskDto;

  //   const task = this.create({
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   });
  //   await this.save(task);
  //   return task;
  // }
}