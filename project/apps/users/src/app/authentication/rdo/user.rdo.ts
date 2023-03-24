import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose({ name: '_id' })
  public id: string;

  @Expose()
  public firstname: string;

  @Expose()
  public lastname: string;

  @Expose()
  public email: string;

  @Expose()
  public town: string;

  @Expose()
  public avatar: string;

  @Expose()
  public dateBirth: string;
}
