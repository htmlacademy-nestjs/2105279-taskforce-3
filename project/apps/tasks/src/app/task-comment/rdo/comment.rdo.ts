import { Expose } from 'class-transformer';

export class CommentRdo {

  @Expose({ name: 'commentId' })
  public id: number;

  @Expose()
  public message: string;

  @Expose()
  public userId: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;
}
