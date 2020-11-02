const plugin = (resolve, options) => ({ resolve, options })
const fileSource = (name, path) => plugin(`gatsby-source-filesystem`, { name, path: `${__dirname}/src${path}` })

const link = (href, text, title) => ({ href, text, title })

module.exports = {
  siteMetadata: {
    title: `lyonheart`,
    description: `the personal site of Matthew Lyon`,
    author: `Matthew Lyon`,
    siteUrl: `https://lyonheart.us`,
    footerLinks: [
      link('mailto:matthew@lyonheart.us', 'matthew@lyonheart.us', "humans welcome to email me"),
      link('https://twitter.com/mattly', '@mattly', "tweeting/bleating"),
      link('https://github.com/mattly', 'github/mattly', "code wasteland"),
    ],
    facebook: {
      admins: '100001660299232'
    },
    twitter: {
      site: '@mattly'
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    fileSource(`articles`, `/articles`),
    fileSource(`talks`, `/content/talks`),
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    plugin(`gatsby-plugin-mdx`, {
      gatsbyRemarkPlugins: [
        `gatsby-remark-images`,
        `gatsby-remark-rewrite-relative-links`,
      ]
    }),
    `gatsby-plugin-emotion`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
