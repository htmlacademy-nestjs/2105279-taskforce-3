import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  public lastname: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'City of residence',
    example: 'Санкт-Петербург'
  })
  public city: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'customer'
  })
  public role: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',

  })
  public dateBirth: Date;

}
