import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Global } from '@emotion/core'
import styled from '@emotion/styled'

import { type, spacing, breakingWide, column } from './molecules'
import '../styles/colors.css'
import '../styles/root.css'
import '../styles/plex.css'

const SiteFooter = styled.div({
  fontFamily: type.sans,
  lineHeight: type.leading.normal,
  color: 'var(--color-fg-xxx)',
}, ({ width }) => ({
  ...column[width],
}))
SiteFooter.propTypes = {
  width: PropTypes.oneOf(Object.keys(column)).isRequired,
}

const FooterLinks = styled.nav({
  display: 'flex',
  flexDirection: 'column',
  [breakingWide]: {
    flexDirection: 'row',
  },
  margin: 0,
  padding: 0,
  fontSize: type.sm1,
})
const FooterLink = styled.a({
  marginRight: spacing.sm,
  color: 'var(--color-fg-xx)',
  textDecoration: 'none'
})

const Copyright = styled.p({
  marginTop: spacing.md,
  fontSize: type.sm2,
  [breakingWide]: {
    marginTop: 0,
  }
})

const Layout = ({ children, width }) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        meta: siteMetadata {
          title
          author
          footerLinks { href text title }
        }
        renderYear: buildTime(formatString: "YYYY")
      }
    }`)

  return (
    <>
      <Global
        styles={{
          '*': { boxSizing: 'border-box' },
          html: {
            fontFamily: type.serif,
            fontSize: '18px',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-fg)',
            [breakingWide]: {
              fontSize: '20px',
            }
          },
          body: { margin: 0 },
        }}
      />
      <main>{children}</main>
      <SiteFooter width={width}>
        <FooterLinks>
          {site.meta.footerLinks.map(({ href, text, title }) => (
            <FooterLink key={href} href={href} title={title}>{text}</FooterLink>
          ))}
        </FooterLinks>
        <Copyright>
          Copyright &copy; { site.renderYear } • { site.meta.author }
        </Copyright>
      </SiteFooter>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOf(['wide','main','narrow']).isRequired,
}

export default Layout
