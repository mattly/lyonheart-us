import React from "react"
import PropTypes from "prop-types"
import { css } from '@emotion/core'

import CodeEmbed from "./code-embed"
import Tabs from "./tabs"
import { spacing, type, box } from './molecules'

const headerStyle = css({
  paddingLeft: spacing.sm,
  fontFamily: type.sans,
  fontSize: type.smX,
  lineHeight: 1,
})

const handleStyle = css({
  '&[aria-selected=true]': {
    backgroundColor: 'var(--color-bg-oo)',
    borderTopLeftRadius: box.radius.med,
    borderTopRightRadius: box.radius.med,
  }
})

const CodeExample = ({ title, examples, defaultResult }) => {
  const tabs = examples.map(({ file }) => ({
    name: file.extension,
    content: <CodeEmbed key={file.relativePath} role="example" file={file} />
  }))
  return (
    <div>
      <Tabs
        headerCss={headerStyle}
        handleCss={handleStyle}
        title={title}
        tabs={tabs}
      />

      <div>
        { defaultResult && <CodeEmbed role="result" {...defaultResult} />}
      </div>
    </div>
  )
}

const codeFile = PropTypes.shape({
  contents: PropTypes.string.isRequired,
  relativePath: PropTypes.string,
  extension: PropTypes.string.isRequired,
})

const codeExample = PropTypes.shape({
  file: codeFile,
})

CodeExample.propTypes = {
  title: PropTypes.string,
  examples: PropTypes.arrayOf(codeExample).isRequired,
  defaultResult: codeExample,
}

export default CodeExample
