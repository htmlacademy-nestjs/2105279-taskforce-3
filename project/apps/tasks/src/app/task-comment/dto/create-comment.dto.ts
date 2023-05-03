import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Message',
    example: 'Message ...',
  })
  @IsString()
  public message: string;

  @ApiProperty({
    description: 'User id',
    example: '18',
  })
  @IsString()
  public userId: string;
}
