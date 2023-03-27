import { Body, Controller, Get, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomerUserRdo } from './rdo/customer-user.rdo';
import { ExecuterUserRdo } from './rdo/executer-user.rdo';
import { TaskUserService } from './task-user.service';

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
  @Patch('update/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
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
  public async customer(@Param('id') id: string) {

    const existUser = await this.userService.getUser(id);
    return fillObject(CustomerUserRdo, existUser);
  }

  /** Информация о исполнителе*/
  @ApiResponse({
    type: CustomerUserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get('executer/:id')
  public async executer(@Param('id') id: string) {

    const existUser = await this.userService.getUser(id);
    return fillObject(ExecuterUserRdo, existUser);
  }
}
