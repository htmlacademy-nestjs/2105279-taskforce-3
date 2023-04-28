import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  public message: string;

  @IsString()
  public userId: string;
}
