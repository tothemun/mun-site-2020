import React from 'react';
import Img from 'gatsby-image';

const Footer = ({ address, copyright, logo }) => (
  <div>
    <Img alt='logo' fluid={logo.fluid} />
    <p
      dangerouslySetInnerHTML={{
        __html: address.childMarkdownRemark.html,
      }}
    />
    {copyright}
  </div>
);

export default Footer;