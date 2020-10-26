import styled from '@emotion/styled'

import { box, type } from './molecules'

const CodeInline = styled.code({
    borderRadius: box.radius.tiny,
    fontFamily: type.mono,
    fontSize: type.sm,
    color: 'var(--color-fg)',
    backgroundColor: 'var(--color-bg-oo)',
})

export default CodeInline