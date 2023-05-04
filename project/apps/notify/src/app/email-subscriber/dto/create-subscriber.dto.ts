import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EMAIL_NOT_VALID, FIRST_NAME_IS_EMPTY, USER_ID_IS_EMPTY } from '../email-subscriber.constant';
import { UserRole } from '@project/shared/app-types';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsString()
  @IsEnum(UserRole)
  public role: string;

  @IsNotEmpty({ message: FIRST_NAME_IS_EMPTY })
  public firstname: string;

  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  public lastname: string;
}
