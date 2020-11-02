import React from "react"
import {Helmet} from 'react-helmet'
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
  fontFamily: type.sans,
  fontSize: type.sm1,
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
  textDecoration: 'none',
})
const NavRel = styled.span({
  display: "block",
  fontWeight: type.bold,
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
  const width = mdx.frontmatter.pageWidth || 'wide'
  const colophon = {
    title: mdx.frontmatter.title,
    path: mdx.fields.path,
    siteUrl: site.meta.siteUrl,
    renderYear: site.renderYear,
    humanDate: mdx.frontmatter.humanDate,
    machineDate: mdx.frontmatter.machineDate,
  }
  const cardImg = mdx.frontmatter.banner ?
    (<Helmet>
      <meta property="og:image" content={`${site.meta.siteUrl}${mdx.frontmatter.banner.img.lg.src}`} />
      <meta property="twitter:image" content={`${site.meta.siteUrl}${mdx.frontmatter.banner.img.lg.src}`} />
      <meta property="twitter:card" content="summary_large_image" />
    </Helmet>) : (<Helmet>
      <meta property="twitter:card" content="summary" />
    </Helmet>)

  return (
    <Layout width={width}>
      <Helmet>
        <title>{mdx.frontmatter.title} • {site.meta.author}</title>
        <meta property="og:title" content={mdx.frontmatter.title} />
        <meta property="og:description" content={mdx.frontmatter.subtitle} />
        <meta property="og:url" content={`${"siteurl"}${mdx.fields.path}`} />
        <meta property="og:site_name" content={`${site.meta.title}`} />
        <meta property="og:locale" content="en-us" />
        <meta property="article:published_time" content={`${mdx.frontmatter.machineDate}`} />
        <meta property="fb:admins" content={`${site.meta.facebook.admins}`} />
        <meta property="twitter:site" content={`${site.meta.twitter.site}`} />
        <meta property="twitter:creator" content={`${site.meta.twitter.site}`} />
        <meta property="twitter:title" content={`${mdx.frontmatter.title}`} />
        <meta property="twitter:description" content={`${mdx.frontmatter.subtitle}`} />
      </Helmet>
      {cardImg}
      <Article width={width} className={articleClass}>
        <MDXProvider components={shortcodes}>
          <MDXRenderer {...mdx} {...mdx.frontmatter} siblings={siblings} colophon={colophon}>
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
      renderYear: buildTime(formatString: "YYYY")
      meta: siteMetadata {
        title
        author
        siteUrl
        facebook { admins }
        twitter { site }
      }
    }
    mdx(id: { eq: $id }) {
      body
      fields {
        path
      }
      frontmatter {
        title
        subtitle
        date
        humanDate: date(formatString: "MMMM Do, YYYY")
        machineDate: date(formatString: "YYYY-MM-DD")
        pageWidth
        banner {
          img: childImageSharp {
            fluid(maxWidth: 2048) { ...GatsbyImageSharpFluid }
            fixed(fit: COVER, width: 2048) { ...GatsbyImageSharpFixed }
            sm: fixed(width: 800) { ...GatsbyImageSharpFixed }
            md: fixed(width: 1200) { ...GatsbyImageSharpFixed }
            lg: fixed(width: 2048) { ...GatsbyImageSharpFixed }
          }
        }
      }
      parent { ... on File { relativeDirectory }}
      siblings { contents, relativePath, extension }
      next { ...relPage }
      prev { ...relPage }
    }
  }
  fragment relPage on Mdx {
    fields { path }
    frontmatter { title }
  }
`
