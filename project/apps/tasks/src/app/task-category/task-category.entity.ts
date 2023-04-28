import { Entity } from '@project/util/util-types';
import { Category } from '@project/shared/app-types';

export class TaskCategoryEntity implements Entity<TaskCategoryEntity>, Category {
  public categoryId: number;
  public name: string;

  constructor(category: Category) {
    this.fillEntity(category);
  }

  public fillEntity(entity: Category) {
    this.name = entity.name;
    this.categoryId = entity.categoryId;
  }

  public toObject(): TaskCategoryEntity {
    return { ...this };
  }
}
