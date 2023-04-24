import { Entity } from '@project/util/util-types';
import { Tag } from '@project/shared/app-types';

export class TaskTagEntity implements Entity<TaskTagEntity>, Tag {
  public id: number;
  public name: string;

  constructor(tag: Tag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: Tag) {
    this.name = entity.name;
    this.id = entity.id;
  }

  public toObject(): TaskTagEntity {
    return { ...this };
  }
}
