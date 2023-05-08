import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { NotifyService } from '../notify/notify.service';
import dayjs from 'dayjs';
import { AUTH_USER_NOT_18_YEAR_OLD, MIN_YEAR_USER_OLD } from './authentication.constant';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) { }

  /** Регистрация пользователя*/
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const old = dayjs(dto.dateBirth).diff(Date(), 'year');
    if (old < MIN_YEAR_USER_OLD) {
      throw Error(AUTH_USER_NOT_18_YEAR_OLD);
    }
    const newUser = await this.authService.register(dto);
    const { email, role, name } = newUser;
    await this.notifyService.registerSubscriber({ email, role, name });
    return fillObject(UserRdo, newUser);
  }

  /** Вход пользователя*/
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verify(dto);
    const loggedUser = await this.authService.createToken(verifiedUser);
    const result = fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
    return {
      ...result,
      id: verifiedUser._id
    };
  }

  /** Смена пароля*/
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'New password changed.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Patch('change')
  @HttpCode(HttpStatus.OK)
  public async changePassword(@Body() dto: ChangePasswordDto) {
    const userEntity = await this.authService.changePassword(dto);
    return fillObject(LoggedUserRdo, userEntity);
  }

  /** Информация о пользователе*/
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.get(id);
    const result = fillObject(UserRdo, existUser);
    return {
      ...result,
      id: existUser._id
    };
  }
}
