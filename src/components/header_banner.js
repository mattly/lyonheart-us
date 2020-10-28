import React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'

import { column, spacing, type } from './molecules'

const Header = styled.header({
    ...column.fullBleed,
    marginBottom: spacing.md,
    position: 'relative',
    height: '400px',
    overflow: 'hidden',
})
const bannerStyle = {
    position: 'absolute',
    left: 0, right: 0,
    height: '400px',
}
const Masthead = styled.div({
    ...column.wide,
    position: 'absolute',
    left: 0, right: 0,
})
const Title = styled.h1({
    marginTop: 0,
    marginBottom: 0,
    fontSize: type.font.size.xl4,
    lineHeight: type.leading.title,
})
const Subtitle = styled.h2({
    marginTop: spacing.smX,
    marginBottom: spacing.smX,
    fontFamily: type.font.family.sans,
    fontSize: type.font.size.md,
    fontWeight: type.font.weight.normal,
})
const HeaderBanner = ({ title, subtitle, banner }) => {
    return <Header>
        <Img
            fluid={banner.childImageSharp.fluid}
            style={bannerStyle} />
        <Masthead>
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Masthead>
    </Header>
}

export default HeaderBanner