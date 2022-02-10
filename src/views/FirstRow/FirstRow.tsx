import React from 'react';
import { childView } from '@yoskutik/mobx-react-mvvm';
import { Form, HBox, TextField, ListField } from '@components';
import type { AppViewModel } from '../App';

/**
 * In the first section there are 3 models: a base one, a model which overrides
 * some fields from base one and a model which extends a base one.
 */
export const FirstRow = childView<AppViewModel>(({ viewModel }) => (
  <HBox cls="first-row" align="start" justify="center" style={{ margin: 10 }}>
    <Form title="User form" model={viewModel.user} onClick={viewModel.onUserSaveClick}>
      <TextField model={viewModel.user} name="name"/>
      <TextField model={viewModel.user} name="surname"/>
      <TextField model={viewModel.user} name="username"/>
      <TextField model={viewModel.user} name="email"/>
      <ListField model={viewModel.user} name="interests"/>
    </Form>

    <Form title="Cool user form (overrided)" model={viewModel.coolUser} onClick={viewModel.onCoolUserSaveClick}>
      <TextField model={viewModel.coolUser} name="name"/>
      <TextField model={viewModel.coolUser} name="surname"/>
      <TextField model={viewModel.coolUser} name="username"/>
      <TextField model={viewModel.coolUser} name="email"/>
      <ListField model={viewModel.coolUser} name="interests"/>
    </Form>

    <Form title="Awesome user form (extended)" model={viewModel.awesomeUser}
          onClick={viewModel.onAwesomeUserSaveClick}>
      <TextField model={viewModel.awesomeUser} name="name"/>
      <TextField model={viewModel.awesomeUser} name="surname"/>
      <TextField model={viewModel.awesomeUser} name="username"/>
      <TextField model={viewModel.awesomeUser} name="email"/>
      <ListField model={viewModel.awesomeUser} name="interests"/>
      <ListField model={viewModel.awesomeUser} name="friends"/>
      <TextField model={viewModel.awesomeUser} name="job"/>
    </Form>
  </HBox>
), false);
