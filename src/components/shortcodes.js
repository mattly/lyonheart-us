import Img from 'gatsby-image'
import styled from '@emotion/styled'

import Aside from './aside'
import CodeInline from './code-inline'
import CodeEmbed from './code-embed'
import CodeExample from './code-example'
import CodeHighlight from './code-highlight'
import HeaderBanner from  './header_banner'
import HeaderPlain from './header_plain'
import NewThought from './new_thought'
import Section from './section'
import Slide from './slide'
import Tabs from './tabs'

import { underlinedLink } from './molecules'

export default {
    a: styled.a(underlinedLink),
    inlineCode: CodeInline,
    Aside,
    CodeEmbed,
    CodeExample,
    CodeHighlight,
    HeaderBanner,
    HeaderPlain,
    Img,
    NewThought,
    Section,
    Slide,
    Tabs,
}

