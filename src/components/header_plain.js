import React from 'react'
import PropTypes from 'prop-types'
import styled from "@emotion/styled"

import { type, spacing } from './molecules'

const Head = styled.header({
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
})

const Title = styled.h1({
    margin: 0,
    fontSize: type.lg4,
})

const HeaderPlain = ({title}) => {
    return (<Head>
        <Title>{title}</Title>
    </Head>)
}
HeaderPlain.propTypes = {
    title: PropTypes.string.isRequired
}
export default HeaderPlain