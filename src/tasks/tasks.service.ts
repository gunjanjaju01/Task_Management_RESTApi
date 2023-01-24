import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  
} from '@nestjs/common';
// import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from '../tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { Brackets } from 'typeorm';
// import { Logger } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository,
    // private logger = new Logger('TasksService', { timestamp: true }),
    // private tasksRepository: Repository<Task>,
  ) {}
  // private tasks: Task[] = []; - removing because now using database
  
  // Method(Function in a class) - By Default Public accsor in typesrcipt
  // getTasks(filterDto: GetTasksFilterDto) : Promise<Task[]> {
  //  return this.tasksRepository.getTasks(filterDto);
  // }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');
    query.where({ user });
    if (status){
      query.andWhere('task.status = :status', { status });
    }
    // do something with search
    if (search){
      query.andWhere(
        // '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        // { search: `%${search}`},
        new Brackets((qb) => {
          qb.where('title ILIKE :search OR description ILIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }

    // try{
      const tasks = await query.getMany();
      return tasks;
    // } catch (error) {
    //   this.logger.error(
    //     `Failed to get tasks for user "${
    //       user.username
    //     }". Filters: ${JSON.stringify(filterDto)}`,
    //  error.stack,
           
    //   );
    //   throw new InternalServerErrorException();
    // }
  }
  // getAllTasks(): Task[] {
//     return this.tasks;
//   }

//   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//     const { status, search } = filterDto;
//     // define a temporary array to hold a result
//     let tasks = this.getAllTasks();

//     // do something with status
//     if (status){
//       tasks = tasks.filter((task) => task.status === status);
//     }
//     // do something with search
//     if (search){
//       tasks = tasks.filter((task) => {
//         if (task.title.includes(search) || task.description.includes(search)) {
//           return true;
//         }

//         return false;
//       });
//     }
//     // return final result
//     return tasks;
//   }

// for database intraction alwasts async operations

  async getTaskById(id: string, user: User): Promise<Task> {
    // try to get task
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    // if not found, throw an error (404 not found)
    if (!found) {
      throw new NotFoundException(`Task with this ID  "${id}" not found`);
    }
    // otherwise, return the found 
    return found;
  }

  //   getTaskById(id: string): Task {
  //     // try to get task
  //     const found = this.tasks.find((task) => task.id === id);
  //     // if not found, throw an error (404 not found)
  //     if (!found) {
  //       throw new NotFoundException('Task with this ID not found');
  //     }
  //     // otherwise, return the found
  //     return found;
  //   }

  //   createTask(createTaskDto: CreateTaskDto): Promise<Task> {

  //     console.log(this.tasksRepository);
  //     return this.tasksRepository.createTask(createTaskDto);
  // }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  //   createTask(createTaskDto: CreateTaskDto): Task {
  //     const { title, description } = createTaskDto;
  //     const task: Task = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };

  //     this.tasks.push(task);
  //     return task;
  //   }

  // delete is going to delete entity it does not check whether entity exists or not
  // Remove you have to actually pass object, so entity should be exists

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException('Task with this ID  `${id}` not found');
    }
    console.log('Deleted');
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
