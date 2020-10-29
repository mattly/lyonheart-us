import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { type, column } from './molecules'

const Article = styled.article({
    position: 'relative',
    lineHeight: type.leading.normal,
    fontSize: type.md,
}, ({ width }) => {
    return {
        ...column[width || 'wide'],
    }
})
Article.propTypes = {
    width: PropTypes.string
}
export default Article