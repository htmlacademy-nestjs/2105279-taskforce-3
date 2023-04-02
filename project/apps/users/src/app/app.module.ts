import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { TaskUserModule } from './task-user/task-user.module';
import { ConfigUsersModule } from '@project/config/config-users';

@Module({
  imports: [AuthenticationModule, TaskUserModule, ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
