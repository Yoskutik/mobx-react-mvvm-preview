import React, { CSSProperties, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Model } from '@yoskutik/mobx-react-mvvm';
import { HBox } from './boxes';
import { LoadingMask } from './LoadingMask';
import { Button } from './Button';
import { Tile } from './Tile';

type FormProps<T extends Model> = {
  title?: string;
  isLoading?: boolean;
  style?: CSSProperties;
  cls?: string;
  buttonText?: string;
  onClick?: () => void;
  model?: T;
  children?: ReactNode;
};

export const Form = observer(<T extends Model>({
  children, style, cls = '', isLoading, buttonText = 'Save', onClick, model, title,
}: FormProps<T>) => (
  <Tile cls={`form ${cls}`} style={style}>
    {title && (
      <div className="form__title">
        <h2>{title}</h2>
      </div>
    )}
    {children}
    {(buttonText || onClick) && (
      <HBox justify="center">
        {/* A button will be active only if passed model have been changed, and it's valid */}
        <Button text={buttonText} onClick={onClick} disabled={!model.isChanged || !model.isValid}/>
      </HBox>
    )}
    {isLoading && <LoadingMask/>}
  </Tile>
  ));
