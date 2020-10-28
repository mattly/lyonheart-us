import React, { useState, useRef, useMemo, useEffect } from "react"
import styled from "@emotion/styled"

import { spacing } from "./molecules"

const Container = styled.div({})

const Header = styled.div({
  display: "flex",
  alignItems: "baseline",
})

const Title = styled.h3({
  margin: 0,
  marginRight: spacing.md,
})

const HandleList = styled.nav({
  display: "flex",
})

const Handle = styled.div({
  cursor: "pointer",
  padding: `${spacing.smX} ${spacing.sm}`,
  '&[aria-selected=true]': {
    color: 'blue',
  }
})

const Panels = styled.div({
  display: "grid",
  gridTemplateColumns: "auto",
  gridTemplateRows: "auto",
  overflow: "auto",
})

const panelBase = {
  gridColumnStart: 1,
  gridColumnEnd: 1,
  gridRowStart: 1,
  gridRowEnd: 2,
  transition: `opacity 200ms ease-out`,
}

const InactivePanel = styled.div({
  ...panelBase,
  zIndex: -1,
  opacity: 0,
})

const ActivePanel = styled.div({
  ...panelBase,
  opacity: 1,
  zIndex: 10,
  display: 'grid',
})

const switchListen = (group, idxesByName, setSelectedTab) => () => {
  const handler = (event) => {
    if (event.detail.group === group) {
      setSelectedTab(idxesByName[event.detail.name])
    }
  }
  document.addEventListener('tab-switch', handler)
  return () => document.removeEventListener('tab-switch', handler)
}

const switchDispatch = (ref, group, name) => (event) => {
  ref.current.dispatchEvent(new CustomEvent('tab-switch', {
    bubbles: true,
    detail: { name, group }
  }))
}

const Tabs = ({ title, tabs = [], defaultIdx = 0, group='default' , ...props }) => {
  const idxesByName = {}
  tabs.forEach((tab, i) => {
    idxesByName[tab.name] = i
  })
  const [selectedTab, setSelectedTab] = useState(defaultIdx)
  const containerRef = useRef()
  useEffect(switchListen(group, idxesByName, setSelectedTab), [group])
  return (
    <Container ref={containerRef}>
      <Header css={props.headerCss}>
        <Title>{title}</Title>
        <HandleList>
          {tabs.map((tab,i) => (
            <Handle
              key={tab.name}
              css={props.handleCss}
              onClick={switchDispatch(containerRef, group, tab.name)}
              aria-selected={i === selectedTab  ? 'true' : 'false'}
            >{tab.name}</Handle>
          ))}
        </HandleList>
      </Header>
      <Panels>
        {tabs.map((tab, i) =>
          i === selectedTab ? (
            <ActivePanel key={tab.name}>{tab.content}</ActivePanel>
          ) : (
            <InactivePanel key={tab.name}>{tab.content}</InactivePanel>
          )
        )}
      </Panels>
    </Container>
  )
}

export default Tabs
