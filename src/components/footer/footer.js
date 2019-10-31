import React from 'react';
import { Col, Row } from 'react-grid-system';
import Img from 'gatsby-image';
import Container from '~components/container';
import styles from './footer.module.scss';

const Footer = ({ address, copyright, logo }) => (
  <div className={styles.container}>
    <Container>
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
    </Container>
  </div>
);

export default Footer;