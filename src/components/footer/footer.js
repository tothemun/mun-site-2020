import React from 'react';

const Footer = ({ address, copyright }) => (
  <div>
    <p
      dangerouslySetInnerHTML={{
        __html: address.childMarkdownRemark.html,
      }}
    />
    {copyright}
  </div>
);

export default Footer;