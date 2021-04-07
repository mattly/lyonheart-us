import React from "react"
import { Helmet } from 'react-helmet'
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import styled from  '@emotion/styled'

import Article from "../../../components/article"
import Layout from "../../../components/layout"
import shortcodes from "../../../components/shortcodes"
import { MDXRenderer } from "gatsby-plugin-mdx"

import data from './data'
import { Chart1, Chart2, colors } from './charts'
import { type } from "../../../components/molecules"

const codes = {
  ...shortcodes,
  Chart1,
  Chart2,
}

const pageStyle = {
  // fontSize: type.smX,
  // lineHeight: type.leading.short,
}

export default function PerspectiveTemplate({ data: { mdx, site } }) {
  const byStateDecade = data.reconciler(mdx.siblings)
  return (
    <Layout width="wide">
      <Helmet></Helmet>
      <Article width="wide" styles={pageStyle}>
        <MDXProvider components={codes}>
          <MDXRenderer {...mdx} {...mdx.frontmatter}
            {...{ byStateDecade }}>
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