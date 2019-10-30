import React from 'react';
import { Container, Col, Row } from 'react-grid-system';
import Img from 'gatsby-image';
import styles from './footer.module.scss';

const Footer = ({ address, copyright, logo }) => (
  <div className={styles.container}>
    <Row>
      <Col xs={12} md={4}>
        <div className={styles.logo}>
          <Img alt='logo' fluid={logo.fluid} />
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: address.childMarkdownRemark.html,
          }}
        />
        {copyright}
      </Col>
    </Row>
  </div>
);

export default Footer;