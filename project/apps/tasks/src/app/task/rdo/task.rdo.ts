import { Expose } from 'class-transformer';
import { Category, Review } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TaskRdo {

  @ApiProperty({
    description: 'Task id',
    example: '18',
  })
  @Expose({ name: 'taskId' })
  public id: number;

  @ApiProperty({
    description: 'Task title',
    example: 'Доставка',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Task details',
    example: 'Details ...',
  })
  @Expose()
  public details: string;

  @ApiProperty({
    description: 'Category',
    example: 'Доставка',
  })
  @Expose()
  public category: Category;

  @ApiProperty({
    description: 'Price',
    example: '1500',
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Deadline',
    example: '2023-03-12',
  })
  @Expose()
  public deadline: Date;

  @ApiProperty({
    description: 'Image',
    example: 'http://example.com/r646oaer32rfr.jpg',
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'Address',
    example: 'Address ...',
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Tags',
    example: 'доставка быстро аккуратно',
  })
  @Expose()
  public tags: string;

  @ApiProperty({
    description: 'City',
    example: 'Москва',
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'Comments list'
  })
  @Expose()
  public comments: Comment[];

  @ApiProperty({
    description: 'Review'
  })
  @Expose({ name: 'Review' })
  public review: Review;

  @ApiProperty({
    description: 'Customer user id'
  })
  @Expose()
  public customerId: string;

  @ApiProperty({
    description: 'Created at',
    example: '2023-03-12',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2023-03-12',
  })
  @Expose()
  public updatedAt: Date;

  @ApiProperty({
    description: 'Status task',
    example: 'new',
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'Executer user id'
  })
  @Expose()
  public executerId: string;
}
