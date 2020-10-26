import React from 'react'
import CodeHighlight from './code-highlight'

const CodeEmbed = ({ file }) => {
  console.log(file)
  return <CodeHighlight language="bash">{file.contents}</CodeHighlight>
}

export default CodeEmbed