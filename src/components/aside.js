import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { spacing, type, breakingWide } from './molecules'

const Aside = styled.aside({
    marginBottom: spacing.md,
    fontFamily: type.font.family.sans,
    fontSize: type.font.size.sm1,
    lineHeight: type.leading.aside,

    [breakingWide]: {
        paddingTop: '6px',
        marginBottom: '-100%',
    },

    '& > *:first-child': {
        marginTop: 0,
    },
})
Aside.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Aside