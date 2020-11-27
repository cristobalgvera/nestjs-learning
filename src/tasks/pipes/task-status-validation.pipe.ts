import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  transform = (status: any) => {
    status = status.toUpperCase();

    if (!this.isStatusValid(status))
      throw new BadRequestException(`'${status}' is an invalid status`);

    return status;
  };

  private isStatusValid = (status: any) => {
    return Object.values(TaskStatus).indexOf(status) !== -1;
  };
}
