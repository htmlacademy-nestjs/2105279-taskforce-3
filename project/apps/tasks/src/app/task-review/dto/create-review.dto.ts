import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review',
    example: 'Review ...',
  })
  @IsString()
  public review: string;

  @ApiProperty({
    description: 'Evaluation',
    example: '4',
  })
  @IsInt()
  @Min(0)
  @Max(5)
  public evaluation: number;

  @ApiProperty({
    description: 'Task id',
    example: '18',
  })
  @IsNumber()
  public taskId: number;
}
