import {
  Body,
  Controller,
  Param,
  Query,
  UsePipes,
  Delete,
  Get,
  Patch,
  Post,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: Task['id']) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: Task['id'],
    @Body('status', TaskStatusValidationPipe) status: UpdateTaskDto['status'],
  ) {
    return this.tasksService.updateTaskStatus({ id, status });
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: Task['id']) {
    return this.tasksService.deleteTaskById(id);
  }
}
