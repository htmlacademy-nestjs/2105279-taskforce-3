import { User, UserRole } from '@project/shared/app-types';

import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './task-user.constant';

export class TaskUserEntity implements User {

  public _id?: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public town: string;
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

  public fillEntity(blogUser: User) {

    this._id = blogUser._id;
    this.firstname = blogUser.firstname;
    this.lastname = blogUser.lastname;
    this.email = blogUser.email;
    this.town = blogUser.town;
    this.passwordHash = blogUser.passwordHash;
    this.role = blogUser.role;
    this.avatar = blogUser.avatar;
    this.dateBirth = blogUser.dateBirth;
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
