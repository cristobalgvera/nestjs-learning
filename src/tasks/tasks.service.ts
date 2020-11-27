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

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks = async (filterDto: GetTasksFilterDto) => {
    return await this.taskRepository.getTasks(filterDto);
  };

  getTaskById = async (id: Task['id']) => {
    try {
      return await this.taskRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(`Task with ID: '${id}' was not found`, error);
    }
  };

  createTask = async (createTaskDto: CreateTaskDto) => {
    try {
      return await this.taskRepository.createTask(createTaskDto);
    } catch (error) {
      throw new BadRequestException(null, error);
    }
  };

  updateTaskStatus = async ({ id, status }: UpdateTaskDto) => {
    const task = await this.getTaskById(id);
    task.status = status;
    return await task.save();
  };

  deleteTaskById = async (id: Task['id']) => {
    const { affected } = await this.taskRepository.delete(id);
    if (affected === 0)
      throw new NotFoundException(`Task with ID: '${id}' was not found`);
  };
}
