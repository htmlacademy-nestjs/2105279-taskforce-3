import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewRdo {
  @ApiProperty({
    description: 'Review id',
    example: '15',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Review',
    example: 'Review ...',
  })
  @Expose()
  public review: string;

  @ApiProperty({
    description: 'Evaluation',
    example: '4',
  })
  @Expose()
  public evaluation: number;

  @ApiProperty({
    description: 'Task id',
    example: '18',
  })
  @Expose()
  public taskId: number;
}
