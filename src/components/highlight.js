import styled from "@emotion/styled"

import { type, box, prefersDark } from "./molecules"

const markers = {
  bold: {
    fontWeight: type.bold,
  },
  green: {
    color: "var(--highlight-fg-green)",
    backgroundColor: "var(--highlight-bg-green)",
    borderRadius: box.radius.tiny,
  },
  redBold: {
    fontWeight: type.bold,
    color: "var(--red-8)",
    [prefersDark]: {
      color: "var(--red-4)",
    },
  },
  serif: {
    fontFamily: type.serif,
  },
  yellow: {
    color: "var(--highlight-fg-yellow)",
    backgroundColor: "var(--highlight-bg-yellow)",
    borderRadius: box.radius.tiny,
  },
}

const Highlight = styled.span({}, ({ marker = "" }) =>
  marker
    .split(",")
    .reduce((out, marker) => ({ ...out, ...markers[marker] }), {})
)

export default Highlight
