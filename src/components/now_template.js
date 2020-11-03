import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from '@emotion/core'

import Layout from "./layout"
import SEO from "../components/seo"
import Article from "./article"
import shortcodes from "./shortcodes"
import { underlinedLink } from './molecules'

const navStyle = css({
  ...underlinedLink,
  color: 'inherit',
})

export default function ArticleTemplate({ data: { mdx } }) {
  return (
    <Layout width="narrow">
      <SEO title="Now" />
      <Article width="narrow">
        <nav>
          <Link to="/" css={navStyle}>Home</Link>
        </nav>
        <MDXProvider components={shortcodes}>
          <MDXRenderer {...mdx} {...mdx.frontmatter} >
            {mdx.body}
          </MDXRenderer>
        </MDXProvider>
      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Now($id: String) {
    mdx(id: { eq: $id }) {
      body
      fields { path }
      frontmatter {
        title
        date
        humanDate: date(formatString: "MMMM Do, YYYY")
        machineDate: date(formatString: "YYYY-MM-DD")
      }
    }
  }
`
