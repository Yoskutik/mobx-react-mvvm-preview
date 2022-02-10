import { field, Model, validate } from '@yoskutik/mobx-react-mvvm';
import { computed, makeObservable, observable } from 'mobx';
import { UserModel } from '../FirstRow';

/**
 * This is also a metamodel, but it has an array of models inside.
 */
export class MetaArrayModel extends Model {
  @observable.shallow users: UserModel[] = [UserModel.create()];

  @validate(value => value)
  @computed get isEveryUserInvalid() {
    return this.users.some(it => !it.isValid);
  }

  @field()
  @computed get isAnyUserDirty() {
    return this.users.some(it => it.isDirty);
  }

  constructor() {
    super();
    makeObservable(this);
  }
}
