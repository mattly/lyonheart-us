import React  from 'react'
import styled from '@emotion/styled'

import { type, spacing, asideContainer } from './molecules'

const Footer = styled.footer({
  marginTop: spacing.md,
  fontSize: type.sm,
  lineHeight: type.leading.none,
  '& > :first-child': {
    paddingTop: spacing.md,
    borderTopWidth: '1px',
    borderTopStyle: 'dotted',
  }
})


const FooterSection = styled.section({
  display: 'grid',
  columnGap: spacing.md,

  lineHeight: type.leading.short,
  marginBottom: spacing.md,
  'p': {
    marginTop: 0,
  },
}, ({ hasAsides }) => ({
  ...(hasAsides && asideContainer),
}))

const FooterSectionTitle = styled.h2({
  margin: 0,
  marginBottom: spacing.sm,
  fontFamily: type.sans,
  fontSize: type.md,
  lineHeight: type.leading.normal,
  textTransform: 'uppercase',
})

Footer.Section = ({ title, hasAsides, children }) => (
  <FooterSection hasAsides={hasAsides}>
    <FooterSectionTitle>{title}</FooterSectionTitle>
    {children}
  </FooterSection>
)

const FurtherReading = styled.div({
  'blockquote': {
    margin: 0,
    marginBottom: spacing.sm,
    padding: `0 ${spacing.sm}`,
    borderLeft: `8px solid var(--color-bg-xx)`,
    color: `var(--color-fg-x)`,
  }
})
const FurtherReadingTitle = styled.h3({
  marginTop: 0,
  marginBottom: spacing.smX,
  fontSize: type.med,
  a: {
    color: 'var(--color-link)',
    textDecoration: 'none',
  }
})
Footer.FurtherReading = ({ title, href, children }) => (
  <FurtherReading>
    <FurtherReadingTitle>
      <a href={href} title={title}>{title}</a>
    </FurtherReadingTitle>
    { children }
  </FurtherReading>
)

export default Footer