import { IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  public message: string;

  @IsString()
  public userId: string;
}
