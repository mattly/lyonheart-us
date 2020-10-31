import React from "react"
import styled from "@emotion/styled"
import Highlight, { defaultProps } from "prism-react-renderer"
import Prism from "prism-react-renderer/prism"

import { type, spacing, box, prefersDark } from "./molecules"

;(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-http")

const theme = {
  plain: {},
  styles: [],
}

const roles = {
  example: {
    backgroundColor: "var(--color-bg-oo)",
    borderTopLeftRadius: box.radius.large,
    borderTopRightRadius: box.radius.large,
  },
  result: {
    backgroundColor: "var(--color-bg-o)",
    borderBottomLeftRadius: box.radius.large,
    borderBottomRightRadius: box.radius.large,
  },
}
roles.sample = {
  ...roles.example,
  borderBottomLeftRadius: box.radius.large,
  borderBottomRightRadius: box.radius.large,
}

const dark = (styles) => ({
  [prefersDark]: {
    background: 'inherit',
    ...styles,
  }
})

const syntaxTheme = {
  ".token.punctuation": {
    color: 'var(--gry-6)'
  },

  ".token.keyword, .token.property": {
    color: "var(--blu-a)",
    backgroundColor: "var(--blu-2)",
    ...dark({ color: 'var(--blu-2)'})
  },

  ".token.string": {
    color: 'var(--grn-a)',
    backgroundColor: 'var(--grn-1)',
    ...dark({ color: 'var(--grn-2)' })
  },

  ".token.variable": {
    fontWeight: type.bold,
    color: 'var(--vlt-a)',
    backgroundColor: 'var(--vlt-2)',
    ...dark({ color: 'var(--vlt-2)'})
  },
}

const Wrapper = styled.div(
  {
    overflow: "auto",
    padding: spacing.sm,
    pre: {
      margin: 0,
      padding: 0,
      fontFamily: type.mono,
      fontSize: type.smX,
      lineHeight: type.leading.tight,
      ...syntaxTheme,
    },
  },
  ({ role }) => {
    return { ...roles[role] }
  }
)

export default ({ children, language, role }) => {
  return (
    <Wrapper role={role}>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={children}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Wrapper>
  )
}
