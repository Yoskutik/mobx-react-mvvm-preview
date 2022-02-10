import React, { CSSProperties, FC } from 'react';
import { VBox } from './boxes';

interface TileProps {
  cls?: string;
  style?: CSSProperties;
}

export const Tile: FC<TileProps> = ({ children, cls = '', style }) => (
  <VBox cls={`${cls} tile`} style={style}>
    {children}
  </VBox>
);
