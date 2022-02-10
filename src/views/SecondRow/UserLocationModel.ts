import { field, Model, TValidator, validate } from '@yoskutik/mobx-react-mvvm';
import { makeObservable, observable } from 'mobx';
import { required } from '@utils';

const coordinates = (): TValidator => (value: string) => {
  if (value) {
    const arr = value.split(' ');
    if (arr.length !== 2 && arr.some(it => Number.isNaN(+it))) return 'Incorrect value';
  }
  return false;
};

/**
 * This is another base model which is used as field of MetaModel
 */
export class UserLocationModel extends Model {
  @validate(coordinates())
  @field({ label: 'Coordinates' })
  @observable coordinates: string = undefined;

  @validate(required())
  @field({ label: 'City' })
  @observable city: string = undefined;

  @field({ label: 'Street' })
  @observable street: string = undefined;

  @field({ label: 'Building' })
  @observable building: string = undefined;

  constructor() {
    super();
    makeObservable(this);
  }
}
