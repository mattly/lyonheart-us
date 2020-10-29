import Img from 'gatsby-image'
import styled from '@emotion/styled'

import Aside from './aside'
import CodeEmbed from './code-embed'
import CodeExample from './code-example'
import CodeHighlight from './code-highlight'
import Colophon from './colophon'
import Footer from './footer'
import HeaderBanner from  './header_banner'
import HeaderPlain from './header_plain'
import NewThought from './new_thought'
import Section from './section'
import Slide from './slide'
import Tabs from './tabs'

import { underlinedLink, box, type } from './molecules'

const CodeInline = styled.code({
    borderRadius: box.radius.tiny,
    fontFamily: type.mono,
    fontSize: type.sm,
    color: 'var(--color-fg)',
    backgroundColor: 'var(--color-bg-oo)',
})

export default {
    a: styled.a(underlinedLink),
    inlineCode: CodeInline,
    Aside,
    CodeEmbed,
    CodeExample,
    CodeHighlight,
    Colophon,
    Footer,
    FooterSection: Footer.Section,
    FurtherReading: Footer.FurtherReading,
    HeaderBanner,
    HeaderPlain,
    Img,
    NewThought,
    Section,
    Slide,
    Tabs,
}

