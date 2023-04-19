import { Expose } from 'class-transformer';

export class ReviewRdo {
  @Expose()
  public id: string;

  @Expose()
  public review: string;

  @Expose()
  public evaluation: number;

  @Expose()
  public taskId: number;
}
