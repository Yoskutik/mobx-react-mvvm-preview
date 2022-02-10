import { makeObservable, observable } from 'mobx';
import { deepComparator, field, Model, validate } from '@yoskutik/mobx-react-mvvm';
import { email, maxLength, required } from '@utils';

/**
 * This is a base model for other models of first section.
 */
export class UserModel extends Model {
  @field({ label: 'Your name' }) @observable name = '';

  @validate(required())
  @field({ label: 'Your surname' }) @observable surname = '';

  @validate(required())
  @field({ label: 'Your username' }) @observable username = '';

  @validate(required(), email(), maxLength(64))
  @field({ label: 'Your email address' }) @observable email = '';

  // This field has comparator: deepComparator because by default values are compared by link.
  // But with this comparator the Model would compare values by array's content
  @field({ comparator: deepComparator(), label: 'Your interests' })
  @observable.shallow interests: string[] = [];

  constructor() {
    super();
    makeObservable(this);
  }
}
