import { User } from '@project/shared/app-types';

import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './task-user.constant';

export class TaskUserEntity implements User {

  public _id?: string;
  public name: string;
  public email: string;
  public city: string;
  public passwordHash: string;
  public role: string;
  public avatar: string;
  public dateBirth: Date;

  public taskCount: number;
  public newCount: number;
  public rating: number;
  public doneCount: number;
  public failedCount: number;
  public info: string;
  public specialization: string;
  public ranking: number;
  public dateRegistration: Date;

  constructor(taskUser: User) {
    this.fillEntity(taskUser);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(taskUser: User) {

    this._id = taskUser._id;
    this.name = taskUser.name;
    this.email = taskUser.email;
    this.city = taskUser.city;
    this.passwordHash = taskUser.passwordHash;
    this.role = taskUser.role;
    this.avatar = taskUser.avatar;
    this.dateBirth = taskUser.dateBirth;

    this.taskCount = taskUser.taskCount;
    this.newCount = taskUser.newCount;
    this.rating = taskUser.rating;
    this.doneCount = taskUser.doneCount;
    this.failedCount = taskUser.failedCount;
    this.info = taskUser.info;
    this.specialization = taskUser.specialization;
    this.ranking = taskUser.ranking;
    this.dateRegistration = taskUser.dateRegistration;
  }

  public async setPassword(password: string): Promise<TaskUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
