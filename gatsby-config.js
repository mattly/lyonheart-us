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
    fileSource(`now`, `/content/now`),
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    plugin(`gatsby-plugin-mdx`, {
      gatsbyRemarkPlugins: [
        plugin(`gatsby-remark-smartypants`, { dashes: 'oldschool' }),
        `gatsby-remark-images`,
        `gatsby-remark-rewrite-relative-links`,
      ]
    }),
    `gatsby-plugin-emotion`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `matthew lyon`,
        short_name: `lyonheart`,
        start_url: `/`,
        background_color: `#f2ece1`,
        theme_color: `#cc4844`,
        display: `minimal-ui`,
        icon: `src/assets/favicon.png`
      },
    },
    plugin(`gatsby-plugin-feed`, {
      query: `{ site { siteMetadata { title description siteUrl }}}`,
      feeds: [
        {
          title: "Recent Content",
          output: "/index.xml",
          query: `{
            allMdx(sort:{ order: DESC, fields: [frontmatter___date]}) {
              nodes {
                frontmatter { title subtitle date }
                fields { path }
              }
            }
          }`,
          serialize: ({ query: { site, allMdx } }) => allMdx.nodes.map(node => ({
            date: node.frontmatter.date,
            url: site.siteMetadata.siteUrl + node.fields.path,
            guid: site.siteMetadata.siteUrl + node.fields.path,
            title: node.frontmatter.title,
            description: node.frontmatter.subtitle
          }))
        }
      ],
    })
  ],
}
