import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Message',
    example: 'Message ...',
  })
  @IsString()
  public message: string;
}
