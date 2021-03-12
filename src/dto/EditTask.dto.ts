import { IsDefined, IsString, ValidateNested } from 'class-validator';
import { AddTaskDto } from './AddTask.dto';

export class EditTaskDto {
  @IsDefined()
  @IsString()
  taskId: string;

  @IsDefined()
  @ValidateNested()
  task: AddTaskDto;
}
