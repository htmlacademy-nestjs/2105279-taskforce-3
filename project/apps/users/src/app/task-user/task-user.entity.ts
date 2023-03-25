import { User, UserRole } from '@project/shared/app-types';

import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './task-user.constant';

export class TaskUserEntity implements User {

  public _id?: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public city: string;
  public passwordHash: string;
  public role: UserRole;
  public avatar: string;
  public dateBirth: Date;

  constructor(taskUser: User) {
    this.fillEntity(taskUser);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(taskUser: User) {

    this._id = taskUser._id;
    this.firstname = taskUser.firstname;
    this.lastname = taskUser.lastname;
    this.email = taskUser.email;
    this.city = taskUser.city;
    this.passwordHash = taskUser.passwordHash;
    this.role = taskUser.role;
    this.avatar = taskUser.avatar;
    this.dateBirth = taskUser.dateBirth;
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
