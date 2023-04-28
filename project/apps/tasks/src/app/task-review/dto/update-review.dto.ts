import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  public review: string;

  @IsInt()
  @Min(0)
  @Max(5)
  public evaluation: number;

  @IsNumber()
  public taskId: number;
}
