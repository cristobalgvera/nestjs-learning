import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  private readonly throwNotFoundException = (id: Task['id']) => {
    throw new NotFoundException(`Task with ID: '${id}' was not found`);
  };

  async getTasks(filterDto: GetTasksFilterDto, user: User) {
    return await this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: Task['id'], user: User) {
    try {
      const task = await this.taskRepository.findOneOrFail({
        where: { id, user },
      });
      delete task.user;
      return task;
    } catch (error) {
      this.throwNotFoundException(id);
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    try {
      return await this.taskRepository.createTask(createTaskDto, user);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateTaskStatus({ id, status }: UpdateTaskDto, user: User) {
    const task = await this.getTaskById(id, user);
    task.status = status;
    return await task.save();
  }

  async deleteTaskById(id: Task['id'], user: User) {
    const { affected } = await this.taskRepository.delete({ id, user });

    if (affected === 0) this.throwNotFoundException(id);
  }
}
