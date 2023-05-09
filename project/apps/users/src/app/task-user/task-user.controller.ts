import { Body, Controller, Get, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomerUserRdo } from './rdo/customer-user.rdo';
import { ExecuterUserRdo } from './rdo/executer-user.rdo';
import { TaskUserService } from './task-user.service';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import dayjs from 'dayjs';
import { MIN_YEAR_USER_OLD, AUTH_USER_NOT_18_YEAR_OLD } from '../authentication/authentication.constant';
import { MAX_SPECIALIZATION_COUNT } from './task-user.constant';

@ApiTags('profile')
@Controller('user')
export class TaskUserController {
  constructor(
    private readonly userService: TaskUserService
  ) { }

  /** Обновление информации пользователя*/
  @ApiResponse({
    type: CustomerUserRdo,
    status: HttpStatus.OK,
    description: 'User update'
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  public async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateUserDto) {
    const old = dayjs(dto.dateBirth).diff(Date(), 'year');
    if (old < MIN_YEAR_USER_OLD) {
      throw Error(AUTH_USER_NOT_18_YEAR_OLD);
    }
    const specialization = [];
    dto.specialization.split(' ').forEach((item) => {
      if (!specialization.some((spec) => spec === item)) {
        specialization.push(item);
      }
    });
    dto.specialization = specialization.slice(0, MAX_SPECIALIZATION_COUNT - 1).join(' ');

    const taskUser = await this.userService.update(id, dto);
    return fillObject(CustomerUserRdo, taskUser);
  }

  /** Информация о заказчике*/
  @ApiResponse({
    type: CustomerUserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get('customer/:id')
  public async customer(@Param('id', MongoidValidationPipe) id: string) {

    const existUser = await this.userService.get(id);
    return fillObject(CustomerUserRdo, existUser);
  }

  /** Информация о исполнителе*/
  @ApiResponse({
    type: ExecuterUserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get('executer/:id')
  public async executer(@Param('id', MongoidValidationPipe) id: string) {

    const existUser = await this.userService.get(id);
    return fillObject(ExecuterUserRdo, existUser);
  }
}
