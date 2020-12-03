import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { TASK } from '../config/context.names';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private readonly logger = new Logger(TASK.REPOSITORY);

  async createTask({ description, title }: CreateTaskDto, user: User) {
    const task = new Task();
    task.status = TaskStatus.OPEN;
    task.title = title;
    task.description = description;
    task.user = user;
    try {
      await task.save();
    } catch (error) {
      this.logger.error(
        `Failed to save task: ${JSON.stringify({
          description,
          title,
        })} for user ID: ${user.id}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete task.user;
    return task;
  }

  async getTasks({ search, status }: GetTasksFilterDto, { id }: User) {
    const query = this.createQueryBuilder('task');

    query.andWhere('task.user.id = :id', { id });

    if (status) query.andWhere('task.status = :status', { status });

    if (search)
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ID: ${id}, filters applied: ${JSON.stringify(
          {
            search,
            status,
          },
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
