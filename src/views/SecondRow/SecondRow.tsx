import React, { useState, VFC } from 'react';
import { observer } from 'mobx-react-lite';
import { childView, Model } from '@yoskutik/mobx-react-mvvm';
import { Button, HBox, TextField, VBox, Tile } from '@components';
import type { AppViewModel } from '../App';

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
 * In the second sections there is a model with nested models. And in this
 * section you can see how to configure validation and watching process for such
 * nested models.
 */
export const SecondRow = childView<AppViewModel>(({ viewModel }) => {
  const [chosenTab, setChosenTab] = useState('User');

  const onSave = () => {
    chosenTab === 'User' && viewModel.meta.general.commit();
    chosenTab === 'Location' && viewModel.meta.location.commit();
  };

  return (
    <HBox justify="center" style={{ margin: 40 }}>
      <Tile style={{ width: 800 }}>
        <HBox cls="tab-panel">
          <VBox style={{ flex: 1 }}>
            <HBox cls="tab-panel__header">
              <Tab text="User" chosen={chosenTab === 'User'} onClick={() => setChosenTab('User')}/>
              <Tab text="Location" chosen={chosenTab === 'Location'} onClick={() => setChosenTab('Location')}/>
            </HBox>
            <VBox cls="tab-panel__content" justify="space-between" align="center">
              <HBox wrap justify="space-around">
                {chosenTab === 'User' && <>
                    <TextField model={viewModel.meta.general} name="name" />
                    <TextField model={viewModel.meta.general} name="surname" />
                    <TextField model={viewModel.meta.general} name="username" />
                    <TextField model={viewModel.meta.general} name="email" />
                </>}
                {chosenTab === 'Location' && <>
                    <TextField model={viewModel.meta.location} name="coordinates" />
                    <TextField model={viewModel.meta.location} name="city" />
                    <TextField model={viewModel.meta.location} name="street" />
                    <TextField model={viewModel.meta.location} name="building" />
                </>}
              </HBox>
              <Button text="Save" onClick={onSave}
                      disabled={!viewModel.meta[chosenTab === 'User' ? 'general' : 'location'].isChanged}/>
            </VBox>
          </VBox>
          <VBox cls="tab-panel__right">
            <h3 style={{ margin: '0 0 16px 0' }}>State</h3>
            <StateBlock model={viewModel.meta} name="MetaModel"/>
            <StateBlock model={viewModel.meta.general} name="UserModel"/>
            <StateBlock model={viewModel.meta.location} name="LocationModel"/>
          </VBox>
        </HBox>
      </Tile>
    </HBox>
  );
});
