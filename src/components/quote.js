import React from "react"
import styled from "@emotion/styled"

import { type, spacing, box, breakingWide } from "./molecules"

const variants = {
  story: {
    fontFamily: type.sans,
    fontSize: type.sm,
    lineHeight: type.leading.tight,
  },
  tweet: {
    borderRadius: box.radius.large,
    backgroundColor: "var(--color-bg-blue)",
    fontFamily: type.sans,
  },
}

const Wrapper = styled.blockquote(
  {
    margin: `0 calc(-1 * ${spacing.sm1})`,
    padding: spacing.sm1,
    backgroundColor: "var(--color-bg-oo)",
    borderRadius: box.radius.med,
    [breakingWide]: {
      marginLeft: spacing.md,
      marginRight: 0,
      paddingLeft: spacing.sm1,
      paddingRight: spacing.sm1,
    },
    p: {
      marginBottom: spacing.sm,
    }
  },
  ({ variant }) => ({
    ...variants[variant],
  })
)

const Footer = styled.footer({
  marginTop: `calc(-1 * ${spacing.md})`,
  textAlign: "right",
  [breakingWide]: {
    marginTop: `calc(-1 * ${spacing.lg})`,
  },
})
const SourceLink = styled.a({
  textDecoration: "none",
  color: "var(--color-link)",
})

const Quote = ({ source, href, variant, children }) => (
  <Wrapper variant={variant}>
    {children}
    {source && (
      <Footer>
        {href ? <SourceLink href={href}>{source}</SourceLink> : source}
      </Footer>
    )}
  </Wrapper>
)

export default Quote
