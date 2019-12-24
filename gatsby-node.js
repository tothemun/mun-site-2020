const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            title
            slug
          }
        }
      }
      allContentfulCaseStudy {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      throw res.errors;
    }

    res.data.allContentfulBlogPost.edges.forEach(({ node }) => {
      createPage({
        path: `/blog/${node.slug}`,
        component: path.resolve("src/templates/blog-post.js"),
        context: {
          slug: node.slug
        }
      });
    });

    res.data.allContentfulCaseStudy.edges.forEach(({ node }) => {
      createPage({
        path: `/work/${node.slug}`,
        component: path.resolve("src/templates/caseStudy/caseStudy.js"),
        context: {
          slug: node.slug
        }
      });
    })
  })
};