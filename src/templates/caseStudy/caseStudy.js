import React from 'react';
import { Col, Row } from 'react-grid-system';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import RichText from '~components/richText/richText';
import Layout from '~components/layout';
import heroStyles from '~components/hero.module.css'

const CaseStudyTemplate = (props) => {
  const post = get(props, 'data.contentfulCaseStudy');
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  console.log(post)
  return (
    <Layout location={props.location}>
      <Helmet title={`${post.title} | ${siteTitle}`} />
      <Row>
        <Col xs={12}>
          <Img 
            className={heroStyles.heroImage} 
            alt={post.title} 
            fluid={post.heroImage.fluid} 
          />
          <h2>{post.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <RichText data={post.body} />
        </Col>
      </Row>
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