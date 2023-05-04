import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting, UserRole } from '@project/shared/app-types';
import { MailService } from '../mail/mail.service';
import { TasksDto } from './dto/tasks.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) { }

  @RabbitSubscribe({
    exchange: 'taskforce.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'taskforce.notify',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.add(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'taskforce.notify',
    routingKey: RabbitRouting.SendNotifications,
    queue: 'taskforce.notify',
  })
  public async sending(tasks: TasksDto) {
    const executers = await this.subscriberService.findRole(UserRole.Executor);
    this.mailService.sendNotifications(executers, tasks);
  }
}
