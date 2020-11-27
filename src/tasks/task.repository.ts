import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  createTask = async ({ description, title }: CreateTaskDto) => {
    const task = new Task();
    task.status = TaskStatus.OPEN;
    task.title = title;
    task.description = description;
    await task.save();

    return task;
  };

  getTasks = async ({ search, status }: GetTasksFilterDto) => {
    const query = this.createQueryBuilder('task');

    if (status) query.andWhere('task.status = :status', { status });

    if (search)
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );

    return await query.getMany();
  };
}
