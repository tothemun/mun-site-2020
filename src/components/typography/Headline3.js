import cn from 'classnames';
import React from 'react';
import styles from './typography.module.scss';

const Headline3 = ({ className, bold, reverse, ...restProps }) => (
  <h1 
    className={cn(className, styles.h3, {[styles.reverse]: reverse, [styles.bold]: bold })} 
    {...restProps} 
  />
);

export default Headline3;