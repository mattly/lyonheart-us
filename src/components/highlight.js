import styled from '@emotion/styled'

import { type, prefersDark } from './molecules'

const markers = {
  redBold: {
    fontWeight: type.bold,
    color: 'var(--red-8)',
    [prefersDark]: {
      color: 'var(--red-4)'
    }
  },
}

const Highlight = styled.span({}, ({marker}) => markers[marker])

export default Highlight