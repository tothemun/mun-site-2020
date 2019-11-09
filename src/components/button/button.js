import React from 'react';
import { Link } from 'gatsby';
import styles from './button.module.scss';

const Button = ({ children, to }) => (
  <Link className={styles.button} to={to}>
    {children}
  </Link>
);

export default Button;