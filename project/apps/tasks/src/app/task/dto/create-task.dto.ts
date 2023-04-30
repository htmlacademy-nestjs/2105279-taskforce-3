import { City } from '@project/shared/app-types';
import { IsEnum, IsISO8601, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {

  @ApiProperty({
    description: 'Task title',
    example: 'Доставка',
  })
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'Task details',
    example: 'Details ...',
  })
  @IsString()
  public details: string;

  @ApiProperty({
    description: 'Category id',
    example: '15',
  })
  @IsNumber()
  public categoryId: number;

  @ApiProperty({
    description: 'Price',
    example: '1500',
  })
  @IsNumber()
  public price: number;

  @ApiProperty({
    description: 'Deadline',
    example: '2023-03-12',
  })
  @IsISO8601({}, { message: 'Deadline not correct' })
  public deadline: Date;

  @ApiProperty({
    description: 'Address',
    example: 'Address ...',
  })
  @IsString()
  public address: string;

  @ApiProperty({
    description: 'Tags',
    example: 'доставка быстро аккуратно',
  })
  @IsString()
  public tags: string;

  @ApiProperty({
    description: 'City',
    example: 'Москва',
  })
  @IsString()
  @IsEnum(City)
  public city: string;
}
