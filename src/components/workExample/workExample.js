import React from 'react';
import { Col } from 'react-grid-system'
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export default ({ heroImage, slug, title }) => (
  <Col xs={12} md={6}>
    <Link to={`/work/${slug}`}>
      <Img alt="" fluid={heroImage.fluid} />
      <h3>{title}</h3>
    </Link>
  </Col>
);