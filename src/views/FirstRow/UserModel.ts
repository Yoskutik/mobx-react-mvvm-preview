import { makeObservable, observable } from 'mobx';
import { deepComparator, field, Model, validate } from '@yoskutik/mobx-react-mvvm';
import { email, maxLength, required } from '@utils';

/**
 * This is a base model for other models of first section.
 */
export class UserModel extends Model {
  @field({ label: 'Your name' }) @observable name = '';

  // This field is have to be required and a string of spaces is not a valid string, so it must be trimmed
  // before the validation.
  @validate({ preprocess: value => value?.trim(), validators: [required()] })
  @field({ label: 'Your surname' }) @observable surname = '';

  @validate({ preprocess: value => value?.trim(), validators: [required()] })
  @field({ label: 'Your username' }) @observable username = '';

  // We don't need to trim this value because ' ' is not a valid email
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
