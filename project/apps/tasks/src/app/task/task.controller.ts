import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';

@ApiTags('task')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) { }

  /* Запрос задания по id */
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const task = await this.taskService.get(id);
    return fillObject(TaskRdo, task);
  }

  /* Запрос списка заданий */
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task found'
  })
  @Get('/')
  async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getList(query);
    return fillObject(TaskRdo, tasks);
  }

  /* Создание нового задания */
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.create(dto);
    return fillObject(TaskRdo, newTask);
  }

  /* Удаление задания */
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Task deleted'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskService.delete(id);
  }

  /* Редактирование задания */
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task edited'
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.taskService.update(id, dto);
    return fillObject(TaskRdo, updatedTask)
  }
}
