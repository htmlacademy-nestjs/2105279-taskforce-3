import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) { }

  @Get('/:id')
  async show(@Param('id') id: number) {
    const task = await this.taskService.getTask(id);
    return fillObject(TaskRdo, task);
  }

  @Get('/')
  async index() {
    const tasks = await this.taskService.getTasks();
    return fillObject(TaskRdo, tasks);
  }

  @Post('/')
  async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    return fillObject(TaskRdo, newTask);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskService.deleteTask(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.taskService.updateTask(id, dto);
    return fillObject(TaskRdo, updatedTask)
  }
}
