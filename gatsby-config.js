const plugin = (resolve, options) => ({ resolve, options })
const fileSource = (name, path) => plugin(`gatsby-source-filesystem`, { name, path: `${__dirname}/src${path}` })

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
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
