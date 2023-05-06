import { TaskCategoryService } from './task-category.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryRdo } from './rdo/category.rdo';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('task-category')
@Controller('categories')
export class TaskCategoryController {
  constructor(
    private readonly taskCategoryService: TaskCategoryService
  ) { }

  /* Запрос категории по id */
  @ApiResponse({
    type: CategoryRdo,
    status: HttpStatus.OK,
    description: 'Category found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existCategory = await this.taskCategoryService.get(id);
    return fillObject(CategoryRdo, existCategory);
  }

  /* Запрос списка категорий */
  @ApiResponse({
    type: CategoryRdo,
    status: HttpStatus.OK,
    description: 'Category found'
  })
  @Get('/')
  async index() {
    const categories = await this.taskCategoryService.getList();
    return fillObject(CategoryRdo, categories);
  }

  /* Создание новой категории */
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new category has been successfully created.'
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.taskCategoryService.create(dto);
    return fillObject(CategoryRdo, newCategory);
  }

  /* Удаление категории */
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Category deleted'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskCategoryService.delete(id);
  }

  /* Редактирование категории */
  @ApiResponse({
    type: CategoryRdo,
    status: HttpStatus.OK,
    description: 'Category edited'
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = await this.taskCategoryService.update(id, dto)
    return fillObject(CategoryRdo, updatedCategory);
  }
}
