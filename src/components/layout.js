import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import base from './base.css'
import Container from '~components/container'
import Navigation from './navigation'
import Footer from './footer/footer';
import Cursor from './cursor/cursor';

class Template extends React.Component {
  render() {
    const { location, children, className } = this.props

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
                  logoKnockout {
                    fluid(maxWidth: 350, resizingBehavior: SCALE) {
                      ...GatsbyContentfulFluid_tracedSVG
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ allContentfulSite: { edges: [ data ] } }) => (
          <div style={{ margin: '0 auto' }}>
            <Helmet title={data.node.siteTitle} />
            <Navigation logo={data.node.logo} />
            <Container className={className}>
              {children}
            </Container>
            <Footer
                address={data.node.address}
                copyright={data.node.copyright}
                logo={data.node.logoKnockout}
              />
              <Cursor />
          </div>
        )}
      />
    );
  }
}

export default Template
