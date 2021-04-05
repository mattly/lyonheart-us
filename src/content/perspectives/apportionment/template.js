import React from "react"
import { Helmet } from 'react-helmet'
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import Article from "../../../components/article"
import Layout from "../../../components/layout"
import shortcodes from "../../../components/shortcodes"
import { MDXRenderer } from "gatsby-plugin-mdx"

import data from './data'

export default function PerspectiveTemplate({ data: { mdx, site } }) {
  console.log(data.reconciler(mdx.siblings))
  return (
    <Layout width="wide">
      <Helmet></Helmet>
      <Article width="wide">
        <MDXProvider components={shortcodes}>
          <MDXRenderer {...mdx} {...mdx.frontmatter}>
            {mdx.body}
          </MDXRenderer>
        </MDXProvider>
      </Article>
    </Layout>)
}

export const pageQuery = graphql`
  query Perspective($id: String) {
    site {
      renderYear: buildTime(formatString: "YYYY")
    }
    mdx(id: { eq: $id }) {
      body
      fields { path }
      frontmatter {
        title
      }
      siblings { contents, relativePath, extension }
    }
  }
`