import React from 'react';
import { Col } from 'react-grid-system'
import Img from 'gatsby-image';
import styles from './clientLogo.module.scss';

export default ({ logo, name, url }) => (
  <Col xs={6} md={4} lg={2} className={styles.container}>
    <Img alt="" fluid={logo.fluid} />
  </Col>
);