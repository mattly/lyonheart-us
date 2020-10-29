import React, { useEffect, useRef } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import Img from "gatsby-image"

import { column, spacing, type, breakingWide } from "./molecules"

const Header = styled.header({
  ...column.fullBleed,
  marginBottom: spacing.md,
  position: "relative",
  height: "400px",
  overflow: "hidden",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
})
const bannerStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  height: "400px",
}
const Masthead = styled.div({
  ...column.wide,
  position: "absolute",
  left: 0,
  right: 0,
  color: "var(--color-fg-title)",
  textShadow: "var(--color-fg-title-shadow)",
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

const HeaderBanner = ({
  title,
  subtitle,
  banner,
  bannerBottom,
  innerBottom,
}) => {
  const header = useRef()
  const enableScroll = useEffect(scrollBanner(header))
  return (
    <Header
      ref={header}
      css={css({
        backgroundImage: `url(${banner.img.sm.base64})`,
        backgroundPosition: `${bannerBottom || 50}%`,
        "@media (max-width: 800px) and (max-resolution: 1.3dppx)": {
          backgroundImage: `url(${banner.img.sm.src})`,
        },
        "@media (max-width: 400px) and (min-resolution: 2dppx)": {
          backgroundImage: `url(${banner.img.md.src})`,
        },
        "@media (min-width: 800px) and (min-resolution:  1.5dppx), (min-width: 1500px)": {
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
