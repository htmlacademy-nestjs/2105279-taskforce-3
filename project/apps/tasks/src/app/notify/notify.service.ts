import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-tasks';
import { ConfigType } from '@nestjs/config';
import { SendNotificationDto } from './dto/send-notification.dto';
import { RabbitRouting } from '@project/shared/app-types';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) { }

  public async sendNotifications(dto: SendNotificationDto[]) {
    return this.rabbitClient.publish<SendNotificationDto[]>(
      this.rabbiOptions.exchange,
      RabbitRouting.SendNotifications,
      [...dto]
    );
  }
}
