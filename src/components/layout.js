import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import { Global } from '@emotion/core'

import { type, breakingWide } from './molecules'
import '../styles/colors.css'
import '../styles/root.css'
import '../styles/plex.css'

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site { siteMetadata { title } }
  //   }
  // `)

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
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
