import { Injectable, NotFoundException } from '@nestjs/common';
import { AUTH_USER_NOT_FOUND } from '../authentication/authentication.constant';
import { UpdateUserDto } from './dto/update-user.dto';
import { TaskUserMemoryRepository } from './task-user-memory.repository';
import { TaskUserEntity } from './task-user.entity';

@Injectable()
export class TaskUserService {
  constructor(
    private readonly taskUserRepository: TaskUserMemoryRepository
  ) { }

  /** Изменение данных о пользователе*/
  public async update(id: string, dto: UpdateUserDto) {
    const taskUser = await this.taskUserRepository.findById(id);
    if (!taskUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const taskUserEntity = new TaskUserEntity({ ...taskUser, ...dto });
    return this.taskUserRepository.update(id, taskUserEntity);
  }

  /** Информация о пользователе*/
  public async getUser(id: string) {
    return this.taskUserRepository.findById(id);
  }
}
