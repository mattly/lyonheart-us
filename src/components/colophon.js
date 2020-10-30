import React from 'react'
import styled from '@emotion/styled'

import { type } from './molecules'

const Section = styled.section({
  marginTop: '4px',
  fontFamily: type.sans,
  fontSize: type.smX,
  lineHeight: type.leading.none,
  color: 'var(--color-fg-xx)',
  'h2': {
    display: 'inline',
    fontSize: 'inherit',
    letterSpacing: type.tracking.wide,
    textTransform: 'uppercase',
  },
  'p': {
    display: 'inline',
  },
  'p::before': {
      content: '"\\00b6"',
      padding: '0 0.25rem',
  },
  'a': {
    color: 'var(--color-link)',
  }
})

const ccLink = (
  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
    Creative Commons Attribution-Noncommercial-Share Alike 4.0 license
  </a>)

const Colophon = ({ title, path, siteUrl, author, humanDate, machineDate, renderYear, }) => (
  <Section>
    <h2>Colophon</h2>
    <p>
      <a href={`${siteUrl}${path}`}>{title}</a> was first published by <a href={siteUrl}>{author}</a> on <time datetime={machineDate}>{humanDate}</time>.
      All images (where applicable, unless otherwise noted) and text &copy; {author} {renderYear}.
      It is published under the {ccLink}.
      If you wish to reproduce any of this content in a commercial context, explicit permission is required.
      Please contact me directly.
    </p>
  </Section>
)
export default Colophon