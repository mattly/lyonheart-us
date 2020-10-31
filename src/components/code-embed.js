import React from "react"

import CodeHighlight from "./code-highlight"


const CodeEmbed = ({ file, lang, ...props }) => {
  const language = lang || file.extension
  const contents = file.contents.replace(/\n$/,'')
  return (
    <CodeHighlight {...props} language={language}>{contents}</CodeHighlight>
  )
}

export default CodeEmbed
