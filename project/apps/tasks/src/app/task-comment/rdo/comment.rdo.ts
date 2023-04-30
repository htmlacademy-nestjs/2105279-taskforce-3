import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {

  @Expose({ name: 'commentId' })
  public id: number;

  @ApiProperty({
    description: 'Message',
    example: 'Message ...',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'User id',
    example: '18',
  })
  @Expose()
  public userId: string;

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
}
