import { Task } from '../task.model';

export class UpdateTaskDto {
  id: Task['id'];
  status: Task['status'];
}
