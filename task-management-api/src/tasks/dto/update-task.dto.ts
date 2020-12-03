import { Task } from '../task.entity';

export class UpdateTaskDto {
  id: Task['id'];
  status: Task['status'];
}
