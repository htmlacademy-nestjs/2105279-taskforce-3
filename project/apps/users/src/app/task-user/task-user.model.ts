import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City, User, UserRole } from '@project/shared/app-types';
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

  @Prop({
    required: true,
    type: String,
    enum: City
  })
  public city: City;

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
    default: ''
  })
  public avatar: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    default: 0
  })
  taskCount: number;

  @Prop({
    default: 0
  })
  newCount: number;

  @Prop({
    default: 0
  })
  rating: number;

  @Prop({
    default: 0
  })
  doneCount: number;

  @Prop({
    default: 0
  })
  failedCount: number;

  @Prop({
    default: ''
  })
  info: string;

  @Prop({
    default: ''
  })
  specialization: string;

  @Prop({
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
