import React, { createContext, useRef } from 'react';
import useBlock from '~hooks/useBlock';
import * as Styled from './block.styled';

interface Props {
  children?: any
  offset: number
  factor: number
};

const offsetContent = createContext(0);

const Block = ({ children, offset, factor, ...restProps }: Props) => {
  const ref = useRef(null);
  // fetch parent offset
  const { offset: parentOffset, sectionHeight } = useBlock();

  return (
    <Styled.Container></Styled.Container>
  );
};

export default Block;
