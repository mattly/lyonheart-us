export const type = {
  sans: "ibm plex sans, Helvetica Neue, Arial, sans-serif",
  serif: "ibm plex serif, Georgia, Times, serif",
  mono: "ibm plex mono, menlo, dejavu sans mono, bitstream vera sans mono, Courier, monospace",
  normal: 400,
  semibold: 600,
  bold: 700,
  sm2: "0.67rem",
  sm1: "0.75rem",
  smX: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg1: "1.25rem",
  lg2: "1.5rem",
  lg4: "2.25rem",
  lg5: "3rem",
  leading: {
    none: "1rem",
    tight: "1.15rem",
    short: "1.33rem",
    normal: "1.66rem",
    title: "2.25rem",
  },
  tracking: {
    wide: '0.05rem',
  }
}

type.LeadingThought = {
  fontSize: type.lg1,
  fontWeight: type.bold,
  lineHeight: type.leading.normal,
}

export const spacing = {
  smX: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg1: "2rem",
}

const centerCol = width =>
  `1fr min(${width}, calc(100% - ${spacing.md} - ${spacing.md})) 1fr`
const colBase = {
  display: "grid",
  columnGap: spacing.md,
  "& > *": {
    gridColumn: 2,
  },
}

export const box = {
    radius: {
        tiny: '0.25rem',
        med: '0.5rem',
        large: '1rem',
    }
}

export const breakingWide = `@media screen and (min-width: 768px)`
export const prefersDark = `@media (prefers-color-scheme: dark)`

export const column = {
  fullBleed: {
    gridColumn: "1 / -1",
  },
  main: {
    ...colBase,
    gridTemplateColumns: centerCol("34rem"),
  },
  wide: {
    ...colBase,
    gridTemplateColumns: centerCol("45rem"),
  },
}

export const asideContainer = {
  [breakingWide]: {
    gridTemplateColumns: `1fr 12rem`,
    "& > *": { gridColumn: 1 },
    "& > aside": { gridColumn: 2 },
  },
}

export const underlinedLink = {
  color: 'inherit',
  textDecoration: 'underline var(--color-local-link) solid 2px',
}