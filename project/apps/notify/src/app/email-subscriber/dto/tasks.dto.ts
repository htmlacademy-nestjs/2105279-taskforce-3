import { IsArray } from 'class-validator';

export class TasksDto {
  @IsArray()
  ids: number[];
}
