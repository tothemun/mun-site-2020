import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import base from './base.css'
import Container from './container'
import Navigation from './navigation'
import Footer from './footer/footer';

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <StaticQuery
        query={graphql`
          query SiteMetadata {
            allContentfulSite {
              edges {
                node {
                  address {
                    childMarkdownRemark {
                      html
                    }
                  }
                  copyright
                  siteTitle
                  logo {
                    fluid(maxWidth: 350, resizingBehavior: SCALE) {
                      ...GatsbyContentfulFluid_tracedSVG
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ allContentfulSite: { edges } }) => (
          <Container>
            <Helmet title={edges[0].node.siteTitle} />
            <Navigation />
            {children}
            <Footer
              address={edges[0].node.address}
              copyright={edges[0].node.copyright}
              logo={edges[0].node.logo}
            />
          </Container>
        )}
      />
    );
  }
}

export default Template
