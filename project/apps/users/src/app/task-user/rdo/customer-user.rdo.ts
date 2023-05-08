import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerUserRdo {

  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'City of residence',
    example: 'Санкт-Петербург'
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'User date registration (ISO format)',
    example: '2021-03-12'
  })
  @Expose()
  public dateRegistration: string;

  @ApiProperty({
    description: 'User role',
    example: 'customer'
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'About user',
    example: 'Предприниматель'
  })
  @Expose()
  public info: string;


  @ApiProperty({
    description: 'Number of published tasks',
    example: '12'
  })
  @Expose()
  public taskCount: number;

  @ApiProperty({
    description: 'The number of tasks with the status "new"',
    example: '3'
  })
  @Expose()
  public newCount: number;
}
