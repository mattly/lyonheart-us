import React  from 'react'
import styled from '@emotion/styled'

import { type, spacing } from './molecules'

const Footer = styled.footer({
  fontSize: type.sm,
  lineHeight: type.leading.none,
  '& > :first-child': {
    paddingTop: spacing.md,
    borderTopWidth: '1px',
    borderTopStyle: 'dotted',
  }
})


const FooterSection = styled.section({
  // paddingBottom: spacing.md,
})
const FooterSectionTitle = styled.h2({
  margin: 0,
  marginBottom: spacing.sm,
  fontFamily: type.sans,
  fontSize: type.md,
  lineHeight: type.leading.normal,
  textTransform: 'uppercase',
})

Footer.Section = ({ title, children }) => (
  <FooterSection>
    <FooterSectionTitle>{title}</FooterSectionTitle>
    {children}
  </FooterSection>
)

const FurtherReading = styled.div({
  lineHeight: type.leading.short,
  marginBottom: spacing.md,
  'p': {
    marginTop: 0,
  },
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