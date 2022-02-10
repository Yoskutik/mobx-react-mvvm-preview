import { computed, makeObservable } from 'mobx';
import { field, Model, validate } from '@yoskutik/mobx-react-mvvm';
import { UserModel } from '../FirstRow';
import { UserLocationModel } from './UserLocationModel';

/**
 * This is a metamodel, and it has a complex structure. This model has another models as its fields.
 * But because of getters and their decorators MetaModel automatically can tell if some of nested
 * models are changed or invalid.
 */
export class MetaModel extends Model {
  general = UserModel.create();

  location = UserLocationModel.create();

  // Can be private, because it's only used in validation process
  @validate(value => value)
  @computed private get isNestedInvalid() {
    return !this.general.isValid || !this.location.isValid;
  }

  @field()
  @computed private get isNestedChanged() {
    return this.general.isDirty || this.location.isDirty;
  }

  constructor() {
    super();
    makeObservable(this);
  }
}
