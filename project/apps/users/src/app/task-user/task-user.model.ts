import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole } from '@project/shared/app-types';
import dayjs from 'dayjs';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class TaskUserModel extends Document implements User {

  @Prop({
    required: true,
  })
  public firstname: string;

  @Prop({
    required: true,
  })
  public lastname: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop()
  public city: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Executor,
  })
  public role: UserRole;

  @Prop({
    required: true,
    default: ''
  })
  public avatar: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
    default: 0
  })
  taskCount: number;

  @Prop({
    required: true,
    default: 0
  })
  newCount: number;

  @Prop({
    required: true,
    default: 0
  })
  rating: number;

  @Prop({
    required: true,
    default: 0
  })
  doneCount: number;

  @Prop({
    required: true,
    default: 0
  })
  failedCount: number;

  @Prop({
    required: true,
    default: ''
  })
  info: string;

  @Prop({
    required: true,
    default: ''
  })
  specialization: string;

  @Prop({
    required: true,
    default: 0
  })
  ranking: number;

  @Prop({
    required: true,
    default: dayjs().toDate()
  })
  dateRegistration: Date;
}

export const TaskUserSchema = SchemaFactory.createForClass(TaskUserModel);
