import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsISO8601, IsString } from 'class-validator';
import { AUTH_USER_DATE_BIRTH_NOT_VALID } from '../../authentication/authentication.constant';
import { City } from '@project/shared/app-types';

export class UpdateUserDto {

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  @IsString()
  public firstname?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  @IsString()
  public lastname?: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  public dateBirth?: Date;

  @ApiProperty({
    description: 'About user',
    example: 'Студент'
  })
  @IsString()
  public info?: string;

  @ApiProperty({
    description: 'Specialization',
    example: 'Курьер'
  })
  @IsString()
  public specialization?: string;

  @ApiProperty({
    description: 'City of residence',
    example: 'Санкт-Петербург'
  })
  @IsString()
  @IsEnum(City)
  public city?: string;
}
