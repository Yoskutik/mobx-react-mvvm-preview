import { makeObservable, override } from 'mobx';
import { deepComparator, field, validate } from '@yoskutik/mobx-react-mvvm';
import { required } from '@utils';
import { UserModel } from './UserModel';

const coolName = () => (value: string) => value && !value.toLocaleLowerCase().includes('cool')
  && 'This name is not cool';

const hasLength = () => (value: string[]) => !value.length && required()('');

const beCool = () => (value: string[]) => value?.length && !value.includes('Be cool')
  && 'Your credo must be cool';

/**
 * This model overrides metadata for some fields of the base model.
 * For example, UserModel's name doesn't have to be "cool", but CoolerUserModel does.
 */
export class CoolerUserModel extends UserModel {
  @validate(required(), coolName())
  @field({ label: 'Your cool name' })
  @override name = '';

  @validate(required(), hasLength(), beCool())
  @field({ comparator: deepComparator(), label: 'Your life credo' })
  @override interests: string[] = [];

  constructor() {
    super();
    makeObservable(this);
  }
}
