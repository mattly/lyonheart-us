import React from 'react'
import styled from '@emotion/styled'

import { spacing } from './molecules'

const Correction = styled.div({
  'p': {
    marginTop: 0,
    marginBottom: spacing.sm,
  }
})

const Title = styled.h4({
  marginTop: 0,
  marginBottom: spacing.sm1,
})

export default ({ date, children }) => (
  <Correction>
    <Title>{date}</Title>
    {children}
  </Correction>
)