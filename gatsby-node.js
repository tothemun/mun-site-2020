const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPosts = graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `).then(results => {
    if (result.errors) {
      console.log("Error retrieving contentful data", result.errors);
    }

    const blogPostTemplate = path.resolve('./src/templates/blog-post.js');
    const posts = result.data.allContentfulBlogPost.edges;

    posts.forEach((post, index) => {
      createPage({
        path: `/blog/${post.node.slug}/`,
        component: blogPostTemplate,
        context: {
          slug: post.node.slug
        },
      })
    });
  }).catch(error => {
    console.log(error);
  });

  const caseStudies = graphql(`
    {
      allContentfulCaseStudy {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `).then(result => {
    console.log("Error retrieving contentful data", result.errors);

    const caseStudyTemplate = path.resolve('./src/templates/caseStudy/caseStudy.js');
    const caseStudies = result.data.allContentfulCaseStudy.edges;

    caseStudies.forEach((caseStudy, index) => {
      createPage({
        path: `work/${caseStudy.node.slug}`,
        component: caseStudyTemplate,
        context: {
          slug: caseStudy.node.slug
        }
      })
    });
  }).catch(error => {
    console.log(error);
  });

  return Promise.all([blogPosts, caseStudies]);
};