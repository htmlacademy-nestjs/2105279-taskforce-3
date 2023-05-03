import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryRdo {
  @ApiProperty({
    description: 'Category id',
    example: '3',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Category name',
    example: 'Доставка',
  })
  @Expose()
  public name: string;
}
