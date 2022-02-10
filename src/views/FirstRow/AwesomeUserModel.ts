import { makeObservable, observable } from 'mobx';
import { deepComparator, field } from '@yoskutik/mobx-react-mvvm';
import { UserModel } from './UserModel';

/**
 * This model extends the base model. It inherits all UserModel's fields metadata and add 2 new fields.
 */
export class AwesomeUserModel extends UserModel {
  @field({ comparator: deepComparator(), label: 'Friends names' })
  @observable.shallow friends: string[] = [];

  @field({ label: 'Job' })
  @observable job: string = undefined;

  constructor() {
    super();
    makeObservable(this);
  }
}
