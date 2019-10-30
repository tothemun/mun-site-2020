import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Layout from '~components/layout';
import ArticlePreview from '~components/article-preview'
import styles from './work.module.scss';

const WorkIndex = (props) => {
  const caseStudies = get(props, 'data.allContentfulCaseStudy.edges');

  return (
    <Layout location={location}>
      <div className="wrapper">
        <h2 className="section-headline">Recent articles</h2>
        <ul className="article-list">
          {caseStudies.map(({ node }) => {
            return (
              <li key={node.slug}>
                <ArticlePreview article={node} />
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default WorkIndex;

export const pageQuery = graphql`
  query WorkIndex {
    allContentfulCaseStudy(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
