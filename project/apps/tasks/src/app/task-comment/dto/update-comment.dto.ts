import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Message',
    example: 'Message ...',
  })
  @IsString()
  public message: string;
}
