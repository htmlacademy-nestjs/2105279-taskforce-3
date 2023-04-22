import { TaskCommentService } from './task-comment.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class TaskCommentController {
  constructor(
    private readonly taskCommentService: TaskCommentService
  ) { }

  @Get('/:id')
  async show(@Param('id') id: string) {
    const commentId = parseInt(id, 10);
    const existComment = await this.taskCommentService.getComment(commentId);
    return fillObject(CommentRdo, existComment);
  }

  @Get('/task/:id')
  async index(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    const comment = await this.taskCommentService.getComments(taskId);
    return fillObject(CommentRdo, comment);
  }

  @Post('/task/:id')
  async create(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    const taskId = parseInt(id, 10);
    const newComment = await this.taskCommentService.createComment(taskId, dto);
    return fillObject(CommentRdo, newComment);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const commentId = parseInt(id, 10);
    this.taskCommentService.deleteComment(commentId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    const commentId = parseInt(id, 10);
    const updatedComment = await this.taskCommentService.updateComment(commentId, { ...dto, userId: '18' });
    return fillObject(CommentRdo, updatedComment);
  }
}
