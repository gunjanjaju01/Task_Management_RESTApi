import { Test } from '@nestjs/testing'
import { TasksRepository } from '../tasks.repository';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service'
import { TaskStatus } from './task.status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  getTaskById: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
}

const mockTask = {
  title: 'Test title',
  description: 'Test desc',
  Id: 'someId',
  status: TaskStatus.OPEN,
}

describe('TasksService', () => {
  let tasksService;
  //   let tasksRepository;
  let tasksRepository: ReturnType<typeof mockTasksRepository>;
  //   let tasksRepository: TasksRepository;
  //   let tasksRepository: Repository<Task>
  // let tasksRepository: ReturnType<typeof mockTasksRepository>;
  


  beforeEach(async () => {
    // intialize a NestJS module with TaskService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService, 
        { provide: TasksService, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    // tasksRepository = module.get(TasksRepository);
  });
  describe('getTasks', () => {
    it('calls TasksService.getTasks and returns the result', async () => {
      expect(tasksService.getTasks).not.toHaveBeenCalled();
      tasksService.getTasks.mockResolvedValue('someValue');
      //   (tasksService.findOne as jest.Mock).mockResolvedValue('someValue');
      // call tasksService.getTasks, which should then call the getTasks
      const result = await tasksService.getTasks(null, mockUser);
      expect(tasksService.getTasks).toHaveBeenCalled();
      // expect
      expect(result).toEqual('someValue');
    });
  });
  describe('getTaskById', () => {
    it('calls TasksService.findOne and returns the result', async () => {
      //   const mockTask = {
      //     title: 'Test title',
      //     description: 'Test desc',
      //     Id: 'someId',
      //     status: TaskStatus.OPEN,
      //   };
      //   findOne({ where: { id, user } })
      
      tasksService.getTaskById.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls TasksService.findOne and handles an error', async () => {

    //   tasksService.getTaskById.mockResolvedValue(null);
    //   const result = await tasksService.getTaskById('someId', mockUser);
    //   expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
