/* eslint-disable prettier/prettier */
import { IsDefined, IsString } from 'class-validator';

export class MarkDoneDto {
  @IsDefined()
  @IsString()
  taskId: string;
}