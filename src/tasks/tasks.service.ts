import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { nanoid } from 'nanoid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private _tasks: Task[] = [];

  getAllTasks = () => {
    return this._tasks;
  };

  getTaskWithFilters = (filterDto: GetTasksFilterDto) => {
    const { search, status } = filterDto;

    return this.getAllTasks().filter((task) =>
      status && task.status !== status
        ? false
        : task.title.includes(search || '') ||
          task.description.includes(search || ''),
    );
  };

  getTaskById = (id: Task['id']) => {
    const found = this._tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`The task with ID: '${id}' was not found`);
    }

    return found;
  };

  createTask = (createTaskDto: CreateTaskDto) => {
    const task: Task = {
      ...createTaskDto,
      id: nanoid(5),
      status: TaskStatus.OPEN,
    };

    this._tasks.push(task);
    return task;
  };

  updateTaskStatus = (updateTaskDto: UpdateTaskDto) => {
    const task = this.getTaskById(updateTaskDto.id);
    task.status = updateTaskDto.status;
    return task;
  };

  deleteTaskById = (id: Task['id']) => {
    this.getTaskById(id);
    this._tasks = this._tasks.filter((task) => task.id !== id);
  };
}
