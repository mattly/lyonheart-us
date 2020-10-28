import React from "react"
import styled from "@emotion/styled"

import CodeHighlight from "./code-highlight"
import { type, spacing, box } from "./molecules"

const roles = {
  example: {
    backgroundColor: 'var(--color-bg-oo)',
    borderTopLeftRadius: box.radius.large,
    borderTopRightRadius: box.radius.large,
  },
  result: {
    backgroundColor: 'var(--color-bg-o)',
    borderBottomLeftRadius: box.radius.large,
    borderBottomRightRadius: box.radius.large,
  }
}

const EmbedWrapper = styled.div({
  overflow: 'auto',
  padding:  spacing.sm,
  'pre': {
    margin: 0, padding: 0,
    fontFamily: type.mono,
    fontSize: type.smX,
    lineHeight: type.leading.tight,
  }
}, ({ role }) => {
    return { ...roles[role] }
})

const CodeEmbed = ({ file, lang, role }) => {
  const language = lang || file.extension
  return (
    <EmbedWrapper role={role}>
      <CodeHighlight language={language}>{file.contents}</CodeHighlight>
    </EmbedWrapper>
  )
}

export default CodeEmbed
