import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

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
    description: 'User birth date',
    example: '1981-03-12',
  })
  public dateBirth: Date;

  @ApiProperty({
    description: 'About user',
    example: 'Студент'
  })
  public info: string;

  @ApiProperty({
    description: 'Specialization',
    example: 'Курьер'
  })
  public specialization: string;

  @ApiProperty({
    description: 'City of residence',
    example: 'Санкт-Петербург'
  })
  public city: string;
}
