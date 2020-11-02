import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "./layout"
import Article from "./article"
import shortcodes from "./shortcodes"

export default function ArticleTemplate({ data: { site, mdx } }) {
  const imageMap = {}
  mdx.slides.forEach(slide => {
      const relPath = slide.parent.relativePath.substr(mdx.parent.relativeDirectory.length + 1)
      imageMap[relPath] = slide
  })
  const siblings = {}
  mdx.siblings.forEach(file => {
    const relPath = file.relativePath.substr(mdx.parent.relativeDirectory.length + 1)
    siblings[relPath] = file
  })
  const colophon = {
    title: mdx.frontmatter.title,
    path: mdx.fields.path,
    siteUrl: site.meta.siteUrl,
    renderYear: site.renderYear,
    humanDate: mdx.frontmatter.humanDate,
    machineDate: mdx.frontmatter.machineDate
  }
  return (
    <Layout width="wide">
      <Article width={mdx.frontmatter.pageWidth}>
        <MDXProvider components={shortcodes}>
          <MDXRenderer
            {...mdx}
            {...mdx.frontmatter}
            colophon={colophon}
            slides={imageMap}
            siblings={siblings}
          >
            {mdx.body}
          </MDXRenderer>
        </MDXProvider>
      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Talk($id: String) {
    site {
      renderYear: buildTime(formatString: "YYYY")
      meta: siteMetadata { title author siteUrl }
    }
    mdx(id: { eq: $id }) {
      body
      fields { path }
      frontmatter {
        title
        date
        humanDate: date(formatString: "MMMM Do, YYYY")
        machineDate: date(formatString: "YYYY-MM-DD")
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
      siblings {
        relativePath
        publicURL
      }
    }
  }
`
