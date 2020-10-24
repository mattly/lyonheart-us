import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Img from 'gatsby-image'

import { spacing } from './molecules'

const SlideContainer = styled.div({
    display: 'grid',
    gridTemplateColumns: `320px 1fr`,
    columnGap: spacing.md,
})

const SlideImage = styled.div({
    gridColumn: 1,
})
const SlideNarration = styled.div({
    gridColumn: 2,
})

const Slide = ({ children, slide }) => {
    return <SlideContainer>
        <SlideImage><Img fixed={slide.fixed} /></SlideImage>
        <SlideNarration>{children}</SlideNarration>
    </SlideContainer>
}

Slide.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Slide