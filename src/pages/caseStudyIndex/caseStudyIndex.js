import React from 'react';
import { graphql } from 'gatsby';
import Layout from '~components/layout';
import styles from './caseStudyIndex.module.scss';

const CaseStudyIndex = () => (
  <div className={styles.container}>
    <div className={styles.child}>Hello</div>
  </div>
);

export default CaseStudyIndex;

export const pageQuery = graphql`
  query CaseStudyIndex {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulCaseStudy(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          tags
        }
      }
    }
  }
`;
