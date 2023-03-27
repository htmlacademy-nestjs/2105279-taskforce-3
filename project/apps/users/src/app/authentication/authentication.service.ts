import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TaskUserMemoryRepository } from '../task-user/task-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import dayjs from 'dayjs';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly taskUserRepository: TaskUserMemoryRepository
  ) { }

  /** Регистрация пользователя*/
  public async register(dto: CreateUserDto) {
    const { firstname, lastname, email, city, password, role, dateBirth } = dto;

    const taskUser = {
      firstname,
      lastname,
      email,
      city,
      passwordHash: '',
      role,
      avatar: '',
      dateBirth: dayjs(dateBirth).toDate(),

      taskCount: 0,
      newCount: 0,
      rating: 0,
      doneCount: 0,
      failedCount: 0,
      info: '',
      specialization: '',
      ranking: 0,
      dateRegistration: dayjs().toDate()
    };

    const existUser = await this.taskUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new TaskUserEntity(taskUser).setPassword(password);
    return this.taskUserRepository.create(userEntity);
  }

  /** Проверка пароля*/
  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.taskUserRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const taskUserEntity = new TaskUserEntity(existUser);
    if (!await taskUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }
    return taskUserEntity.toObject();
  }

  /** Смена пароля*/
  public async changePassword(dto: ChangePasswordDto) {
    const { email, password, newPassword } = dto;
    const userEntity = await this.verifyUser({ email, password });
    await userEntity.setPassword(newPassword);
    return this.taskUserRepository.update(userEntity._id, userEntity);
  }

  /** Информация о пользователе*/
  public async getUser(id: string) {
    return this.taskUserRepository.findById(id);
  }
}
