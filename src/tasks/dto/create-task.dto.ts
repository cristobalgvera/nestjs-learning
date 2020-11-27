import { Task } from '../task.model';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: Task['title'];

  @IsNotEmpty()
  description: Task['description'];
}
