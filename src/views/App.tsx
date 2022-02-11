import React from 'react';
import { injectable } from 'tsyringe';
import { view, ViewModel } from '@yoskutik/mobx-react-mvvm';
import { ToastsContainer } from '@components';
import { ToastsService } from '@services';
import { SessionStorage } from '@utils';
import { AwesomeUserModel, CoolerUserModel, FirstRow, UserModel } from './FirstRow';
import { MetaModel, SecondRow } from './SecondRow';
import { MetaArrayModel, ThirdRow } from './ThirdRow';
import '../Style.scss';

@injectable()
export class AppViewModel extends ViewModel {
  // If you want to create model with initial values you can pass an initial object to create function.
  readonly user = UserModel.create(SessionStorage.get('user'));

  readonly coolUser = CoolerUserModel.create(SessionStorage.get('cool-user'));

  readonly awesomeUser = AwesomeUserModel.create(SessionStorage.get('awesome-user'));

  // If you don't pass such object, the model will be created with default values
  readonly meta = MetaModel.create();

  readonly metaArray = MetaArrayModel.create();

  constructor(private toastsService: ToastsService) {
    super();
  }

  onUserSaveClick = () => {
    // Model resets after a commit. isChanged becomes false
    this.user.commit();
    // state will return an object without Model's service fields and getters
    // It can be using in API requests
    SessionStorage.set('user', this.user.state);
    this.toastsService.make('User data was updated');
  };

  onCoolUserSaveClick = () => {
    this.coolUser.commit();
    SessionStorage.set('cool-user', this.coolUser.state);
    this.toastsService.make('Cool user data was updated');
  };

  onAwesomeUserSaveClick = () => {
    this.awesomeUser.commit();
    SessionStorage.set('awesome-user', this.awesomeUser.state);
    this.toastsService.make('Awesome user data was updated');
  };
}

export const App = view(AppViewModel)(() => <>
  <FirstRow/>
  <hr/>
  <SecondRow/>
  <hr/>
  <ThirdRow/>
  <ToastsContainer/>
</>);
