import { TaskCategoryService } from './task-category.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryRdo } from './rdo/category.rdo';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { UserRole } from '@project/shared/app-types';
import { AuthenticationService } from '../authentication/authentication.service';

@ApiTags('task-category')
@Controller('categories')
export class TaskCategoryController {
  constructor(
    private readonly taskCategoryService: TaskCategoryService,
    private readonly authService: AuthenticationService
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
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() dto: CreateCategoryDto, @Req() req: Request) {
    const token = await this.authService.getPayload(req.headers['authorization']);
    if (token.role == UserRole.Customer) {
      const newCategory = await this.taskCategoryService.create(dto);
      return fillObject(CategoryRdo, newCategory);
    }
  }
}
