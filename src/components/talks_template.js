import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "./layout"
import Article from "./article"
import shortcodes from "./shortcodes"

export default function ArticleTemplate({ data: { mdx } }) {
    const imageMap = {}
    mdx.slides.forEach(slide => {
        const relPath = slide.parent.relativePath.substr(mdx.parent.relativeDirectory.length + 1)
        imageMap[relPath] = slide
    })
    console.log(imageMap)
  return (
    <Layout>
      <Article width={mdx.frontmatter.pageWidth}>
        <MDXProvider components={shortcodes}>
          <MDXRenderer {...mdx} {...mdx.frontmatter} slides={imageMap}>
            {mdx.body}
          </MDXRenderer>
        </MDXProvider>
      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Talk($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date
        pageWidth
        thumbnail {
            childImageSharp {
                fixed(width: 176) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
      }
      parent { ... on File { relativeDirectory }}
      slides: images(pathMatching: "slides") {
          fixed(width: 320) {
              ...GatsbyImageSharpFixed
          }
          parent { ... on File { relativePath }}
      }
    }
  }
`
