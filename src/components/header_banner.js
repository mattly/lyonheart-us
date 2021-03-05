import React, { useEffect, useRef } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { column, spacing, type, breakingWide } from "./molecules"

const Header = styled.header({
  ...column.fullBleed,
  marginBottom: spacing.md,
  position: "relative",
  height: "400px",
  overflow: "hidden",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: `var(--gry-8)`,
})
const Masthead = styled.div({
  ...column.wide,
  position: "absolute",
  left: 0,
  right: 0,
  color: "var(--color-fg-title)",
  textShadow: "2px 2px 4px var(--color-fg-title-shadow)",
})
const Title = styled.h1({
  marginTop: 0,
  marginBottom: 0,
  fontSize: type.lg4,
  lineHeight: type.leading.title,
  [breakingWide]: {
    fontSize: type.lg5,
  },
})
const Subtitle = styled.h2({
  marginTop: spacing.smX,
  marginBottom: spacing.smX,
  fontFamily: type.sans,
  fontSize: type.md,
  fontWeight: type.normal,
  [breakingWide]: {
    fontSize: type.lg2,
  },
})

const scrollBanner = ref => {
  return () => {
    const scrollFn = () => {
      if (!ref.current) { return }
      let pos = (window.scrollY - ref.current.offsetTop) / ref.current.clientHeight
      pos = pos * 50 + 50
      pos = Math.min(pos, 100)
      pos = Math.max(pos, 0)
      ref.current.style["background-position-y"] = `${pos}%`
    }
    scrollFn()
    document.addEventListener("scroll", scrollFn)
    return () => { document.removeEventListener('scroll', scrollFn)}
  }
}

const mdQuery = `
  (min-width: 960px),
  (max-width: 400px) and (min-resolution: 2dppx)
`
const lgQuery = `
  (min-width: 1500px),
  (min-width: 960px) and (min-resolution: 1.4dppx)
`

const HeaderBanner = ({
  title,
  subtitle,
  banner,
  bannerBottom,
  innerBottom,
}) => {
  const header = useRef()
  useEffect(scrollBanner(header))
  return (
    <Header
      ref={header}
      css={css({
        backgroundPosition: `${bannerBottom || 50}%`,
        backgroundImage: `url(${banner.img.sm.src})`,
        [`@media ${mdQuery}`]: {
          backgroundImage: `url(${banner.img.md.src})`,
        },
        [`@media ${lgQuery}`]: {
          backgroundImage: `url(${banner.img.lg.src})`,
        },
      })}
    >
      <Masthead
        css={css({
          bottom: `${innerBottom || 10}%`,
        })}
      >
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Masthead>
    </Header>
  )
}

export default HeaderBanner
