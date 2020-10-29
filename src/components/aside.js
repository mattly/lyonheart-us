import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { spacing, type, breakingWide } from './molecules'

const Aside = styled.aside({
    marginBottom: spacing.md,
    fontFamily: type.sans,
    fontSize: type.sm1,
    lineHeight: type.leading.tight,

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