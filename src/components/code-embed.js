import React from "react"

import CodeHighlight from "./code-highlight"


const CodeEmbed = ({ file, lang, ...props }) => {
  const language = lang || file.extension
  return (
    <CodeHighlight {...props} language={language}>{file.contents}</CodeHighlight>
  )
}

export default CodeEmbed
