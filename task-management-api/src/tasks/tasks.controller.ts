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
  UseGuards,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/decorators/auth.decorator';
import { TASK } from '../config/context.names';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private readonly logger = new Logger(TASK.CONTROLLER);

  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      `Getting all tasks of user ID: ${
        user.id
      }, filters applied: ${JSON.stringify(filterDto)}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: Task['id'],
    @GetUser() user: User,
  ) {
    this.logger.verbose(`Getting task ID: ${id} from user ID: ${user.id}`);
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    this.logger.verbose(
      `Creating task: ${JSON.stringify(createTaskDto)} for user ID: ${user.id}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: Task['id'],
    @Body('status', TaskStatusValidationPipe) status: UpdateTaskDto['status'],
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      `Updating status of task ID: ${id}, new status: ${status} for user ID: ${user.id}`,
    );
    return this.tasksService.updateTaskStatus({ id, status }, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: Task['id'],
    @GetUser() user: User,
  ) {
    this.logger.verbose(`Deleting task ID: ${id} of user ID: ${user.id}`);
    return this.tasksService.deleteTaskById(id, user);
  }
}
