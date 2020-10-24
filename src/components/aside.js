import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { spacing, type, breakingWide } from './molecules'

const Aside = styled.aside({
    marginBottom: spacing.md,
    fontFamily: type.font.family.sans,
    fontSize: type.font.family.sm1,
    lineHeight: type.leading.aside,

    [breakingWide]: {
        marginLeft: 0,
        paddingTop: '6px',
    },

    '& > *:first-child': {
        marginTop: 0,
    },

    '&:last-child': {
        [breakingWide]: {
            marginBottom: '-100%',
        }
    },
})
Aside.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Aside