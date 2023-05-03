import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Доставка',
  })
  @IsString()
  public name: string;
}
