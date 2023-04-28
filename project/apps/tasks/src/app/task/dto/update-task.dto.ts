import { City } from '@project/shared/app-types';
import { IsEnum, IsISO8601, IsNumber, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  public title?: string;

  @IsString()
  public details?: string;

  @IsNumber()
  public categoryId: number;

  @IsNumber()
  public price?: number;

  @IsISO8601({}, { message: 'Deadline not correct' })
  public deadline?: Date;

  @IsString()
  public address?: string;

  @IsString()
  public tags?: string;

  @IsString()
  @IsEnum(City)
  public city?: string;
}
