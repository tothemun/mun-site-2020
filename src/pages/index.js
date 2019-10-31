import React from 'react'
import { Col, Row } from 'react-grid-system'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Hero from '~components/hero'
import Layout from '~components/layout'
import ArticlePreview from '~components/article-preview'
import ClientLogo from '~components/clientLogo/clientLogo'
import WorkExample from '~components/workExample/workExample';
import styles from './index.module.scss';

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.edges');
    const homepageData = get(this, 'props.data.allContentfulHomepage.edges')[0].node;
    const clientList = get(homepageData, 'clientList');
    const workExamples = get(homepageData, 'workExamples');

    console.log(workExamples)
    return (
      <Layout className={styles.wrapper} location={this.props.location}>
          <Hero data={homepageData} />
          <Row className={styles.section}>
            <Col xs={12}>
            <h2 className="section-headline">{homepageData.workHeadline}</h2>
            </Col>
            {workExamples.map(({ heroImage, slug, title }) => {
              return (
                <WorkExample heroImage={heroImage} title={title} slug={slug} />
              )
            })}
          </Row>
          <Row className={styles.section}>
            <Col xs={12}>
            <h2 className="section-headline">{homepageData.clientListHeadline}</h2>
            </Col>
            {clientList.map(({ logo, name, url }) => {
              return (
                <ClientLogo logo={logo} />
              )
            })}
          </Row>
          <Row className={styles.section}>
            <Col xs={12}>
              <h2 className="section-headline">{homepageData.blogHeadline}</h2>
            </Col>
            <Col xs={12}>
              <ul className="article-list">
                {posts.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
            </Col>
          </Row>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
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
    allContentfulHomepage(filter: { contentful_id: { eq: "tnsA2pSaEZF33cRFuTApC" } }) {
      edges {
        node {
          headerCopy
          clientListHeadline
          blogHeadline
          clientList {
            name
            logo{
              fluid {
                ...GatsbyContentfulFluid_tracedSVG
              }
              title
            }
            url
          }
          workHeadline
          workExamples {
            heroImage {
              fluid {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
            slug
            title
          }
        }
      }
    }
  }
`
