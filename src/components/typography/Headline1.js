import cn from 'classnames';
import React from 'react';
import styles from './typography.module.scss';

const Headline1 = ({ className, bold, reverse, ...restProps }) => (
  <h1 
    className={cn(styles.h1, {[styles.reverse]: reverse, [styles.bold]: bold }, className)} 
    {...restProps} 
  />
);

export default Headline1;