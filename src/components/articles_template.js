import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { cx } from "emotion"
import styled from "@emotion/styled"

import Article from "./article"
import Layout from "./layout"
import shortcodes from "./shortcodes"
import { type, spacing, column, breakingWide } from "./molecules"

const NavContainer = styled.div({}, ({ width }) => ({
  ...column[width],
}))
const Nav = styled.nav({
  display: "grid",
  columnGap: spacing.md,
  rowGap: spacing.md,
  marginTop: spacing.md,
  marginBottom: spacing.md,
  paddingTop: spacing.smX,
  [breakingWide]: {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  borderTop: `1px dotted`,
  fontFamily: type.font.sans,
  fontSize: type.font.sm1,
  textTransform: "uppercase",
})

const navItemByRel = {
    home: {
        gridRow: 1,
        gridColumn: 2,
        textAlign: 'center',
    },
    next: {
        gridColumn: 3,
        textAlign: 'right',
    }
}

const NavItem = styled.div(
  {
    lineHeight: type.leading.tight,
    textAlign: "left",
  },
    ({ rel }) => ({
        [breakingWide]: navItemByRel[rel]
  })
)
const NavLink = styled.a({
  color: "inherit",
})
const NavRel = styled.span({
  display: "block",
  fontWeight: type.font.bold,
})
const NavTitle = styled.span({
  // color: link-color
})

export default function ArticleTemplate({ data: { mdx, site } }) {
  const siblings = {}
  mdx.siblings.forEach(file => {
    const relPath = file.relativePath.substr(mdx.parent.relativeDirectory.length + 1)
    siblings[relPath] = file
  })
  const articleClass = cx({
    hasAsides: !mdx.frontmatter.pageWidth,
  })
  const width = mdx.frontmatter.pageWdidth || 'wide'
  return (
    <Layout>
      <Article width={mdx.frontmatter.pageWidth} className={articleClass}>
        <MDXProvider components={shortcodes}>
          <MDXRenderer {...mdx} {...mdx.frontmatter} siblings={siblings}>
            {mdx.body}
          </MDXRenderer>
        </MDXProvider>
      </Article>
      <NavContainer width={width}>
        <Nav>
          <NavItem rel="prev">
            {mdx.prev && (
              <NavLink href={mdx.prev.fields.path}>
                <NavRel>← previous</NavRel>
                <NavTitle>{mdx.prev.frontmatter.title}</NavTitle>
              </NavLink>
            )}
          </NavItem>
          <NavItem rel="next">
            {mdx.next && (
              <NavLink href={mdx.next.fields.path}>
                <NavRel>next →</NavRel>
                <NavTitle>{mdx.next.frontmatter.title}</NavTitle>
              </NavLink>
            )}
          </NavItem>
          <NavItem rel="home">
            <NavLink href="/">home</NavLink>
          </NavItem>
        </Nav>
      </NavContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Article($id: String) {
    site {
      host
      port
      pathPrefix
    }
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        subtitle
        date
        pageWidth
        banner {
          childImageSharp {
            fluid(maxWidth: 1920) { ...GatsbyImageSharpFluid }
          }
        }
      }
      parent { ... on File { relativeDirectory }}
      siblings { contents, relativePath }
      next { ...relPage }
      prev { ...relPage }
    }
  }
  fragment relPage on Mdx {
    fields { path }
    frontmatter { title }
  }
`
