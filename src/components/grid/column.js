import React from 'react';
import { Col } from 'react-grid-system';

const Column = ({ children, ...restProps }) => (
  <Col {...restProps}>
    {children}
  </Col>
);

export default Column;