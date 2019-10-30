import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import Layout from '~components/layout';

const CaseStudyTemplate = (props) => {
  const post = get(props, 'data.contentfulCaseStudy');
  const siteTitle = get(props, 'data.site.siteMetadata.title');

  return (
    <Layout location={props.location}>
      <div>
        <Helmet title={`${post.title} | ${siteTitle}`} />
      </div>
    </Layout>
  )
};

export default CaseStudyTemplate;

export const pageQuery = graphql`
  query CaseStudyBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulCaseStudy(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        json
      }
    }
  }
`;