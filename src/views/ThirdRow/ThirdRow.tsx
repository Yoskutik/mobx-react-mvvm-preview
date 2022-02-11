import React, { useState, VFC } from 'react';
import { observer } from 'mobx-react-lite';
import { childView, Model } from '@yoskutik/mobx-react-mvvm';
import { Button, HBox, TextField, VBox, Tile } from '@components';
import type { AppViewModel } from '../App';
import { UserModel } from '../FirstRow';

const Tab: VFC<{ chosen?: boolean; text: string; onClick: () => void }> = ({ chosen, text, onClick }) => (
  <div className={`tab ${chosen ? 'chosen' : ''}`} onClick={onClick}>
    {text}
  </div>
);

const StateBlock = observer(<T extends Model>({ model, name }: { model: T, name: string }) => (
  <VBox cls="tab-panel__state-block">
    <b style={{ marginBottom: 5 }}>{name}</b>
    <div>Is valid: {model.isValid.toString()}</div>
    <div>Is changed: {model.isChanged.toString()}</div>
  </VBox>
));

/**
 * The third sections is pretty much the same as previous one, but in this
 * section the amount of nested models can be changed dynamically.
 */
export const ThirdRow = childView<AppViewModel>(({ viewModel }) => {
  const [chosenTab, setChosenTab] = useState(0);
  const chosenModel = viewModel.metaArray.users[chosenTab];

  const addUser = () => {
    viewModel.metaArray.users.push(UserModel.create());
    setChosenTab(viewModel.metaArray.users.length - 1);
  };

  const onDeleteClick = () => {
    viewModel.metaArray.users = viewModel.metaArray.users.filter((_, i) => i !== chosenTab);
    chosenTab > 0 ? setChosenTab(chosenTab - 1) : addUser();
  };

  return (
    <HBox justify="center" style={{ margin: 40 }}>
      <Tile style={{ width: 800 }}>
        <HBox cls="tab-panel">
          <VBox style={{ flex: 1 }}>
            <HBox cls="tab-panel__header">
              {viewModel.metaArray.users.map((_, i) => (
                <Tab text={`${i + 1}`} chosen={chosenTab === i} onClick={() => setChosenTab(i)} key={Math.random()}/>
              ))}
              <Tab text="+" onClick={addUser}/>
            </HBox>
            <VBox cls="tab-panel__content" justify="space-between" align="center">
              <HBox wrap justify="space-around">
                <TextField model={chosenModel} name="name" />
                <TextField model={chosenModel} name="surname" />
                <TextField model={chosenModel} name="username" />
                <TextField model={chosenModel} name="email" />
              </HBox>
              <HBox>
                <Button text="Save" onClick={() => chosenModel.commit()} disabled={!chosenModel.isChanged}
                        style={{ marginRight: 10 }}/>
                <Button text="Delete" onClick={onDeleteClick}/>
              </HBox>
            </VBox>
          </VBox>
          <VBox cls="tab-panel__right">
            <h3 style={{ margin: '0 0 16px 0' }}>State</h3>
            <StateBlock model={viewModel.metaArray} name="MetaModel"/>
            {viewModel.metaArray.users.map((model, i) => (
              <StateBlock model={model} name={`UserModel: ${i + 1}`} key={Math.random()}/>
            ))}
          </VBox>
        </HBox>
      </Tile>
    </HBox>
  );
});
