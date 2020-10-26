import React from 'react'
import Highlight, {defaultProps}  from 'prism-react-renderer'

const theme = {
  plain: {},
  styles: [],
}

export default ({ children, language }) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={children} language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}