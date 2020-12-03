import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { Task } from '../task.entity';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: Task['status'];

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
